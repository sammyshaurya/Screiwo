import express from "express";
import User from "../../models/User.model.js";
import Profile from "../../models/Profile.model.js";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import {verifyUser, userProfile} from './fetchData.js'

const Router = express.Router();

Router.use(cors());


Router.get("/api/profile", verifyUser, userProfile, async (req, res) => {
  const userProfile = {profile : req.profile, user: req.user}
  res.status(201).send(userProfile)
})

Router.post("/api/users/signup", async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;

  try {
    if (!username || !email || !password || !firstname || !lastname) {
      return res.status(400).send("Please fill all the fields");
    }
    if (password.length < 8) {
      return res.status(400).send("Password must be at least 8 characters");
    }

    const existingUser = await User.findOne({ email: email , username: username });
    if (existingUser) {
      return res.status(400).send("Email or username already exists");
    }


    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hash,
      firstname,
      lastname,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ _id: savedUser._id }, process.env.jwt_secret);
    savedUser.token = token;
    await savedUser.save();
    res.send({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error handling signup request:", error);
    res.status(500).send("Internal Server Error");
  }
});

Router.get("/api/users/login", async (req, res) => {
  const { username, password } = req.query;
  const user = await User.findOne({ username: username });
  const userProfiled = await Profile.findOne({ userid: user._id });
  if (userProfiled) {return res.send({profiled: true, token: user.token})}
  const validPassword = await bcrypt.compare(password, user.password);
  if (!user || !validPassword) {
    return res.status(400).send("Invalid username or password");
  }
  const token = user.token;
  res.send({ profiled: false, token: token });
});


Router.post("/api/profile/create", verifyUser, async (req, res) => {
  try {
    const { profileType, gender, dob, mobile } = req.body.profileData;
    const { token } = req.body;

    const decodedToken = jwt.verify(token, process.env.jwt_secret);
    const userId = decodedToken._id;

    const dbUser = await User.findById(userId);
    const existProfile = await Profile.findOne({ userid: userId });
    if (dbUser) {
      if (!existProfile) {
        const newProfile = new Profile({
          userid: userId,
          profileType,
          gender,
          dob,
          mobile,
        });

        await newProfile.save();
        dbUser.isVerified = true;
        dbUser.save();

        res.status(201).json({ message: "Profile created successfully" });
      } else {
        existProfile.profileType = profileType;
        existProfile.gender = gender;
        existProfile.dob = dob;
        existProfile.mobile = mobile;
        await existProfile.save();
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default Router;