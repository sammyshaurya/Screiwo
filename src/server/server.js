import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
const App = express();

// Apply middleware
App.use(express.json());
App.use(cors());

// Connect to the database
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database Connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error;
    }
};

// Define route for user signup
App.post('/api/users/signup', async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;
  
  try {
      if (!username || !email || !password || !firstname || !lastname) {
          return res.status(400).send('Please fill all the fields');
      }
      if (password.length < 8) {
          return res.status(400).send('Password must be at least 8 characters');
      }
      
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
          return res.status(400).send('Email already exists');
      }
      
      const hash = await bcrypt.hash(password, 10);
      
      const newUser = new User({
          username,
          email,
          password: hash,
          firstname,
          lastname
      });
      
      const savedUser = await newUser.save();
      
      const token = jwt.sign({ _id: savedUser._id }, process.env.jwt_secret);
      console.log(token);
      savedUser.token = token;
      await savedUser.save();
      res.send({ message: "Account created successfully"});

  } catch (error) {
      console.error("Error handling signup request:", error);
      res.status(500).send('Internal Server Error');
  }
});


App.get('/api/users/login', async (req, res) => {
    const { username,password } = req.query;
    const user = await User.findOne({username: username});
    const validPassword = await bcrypt.compare(password, user.password)
    if (!user || !validPassword) {
        return res.status(400).send('Invalid username or password');
    }
    const token = user.token
    res.send({message: "Login Successful", token: token});
})


// Start the server after database connection
connectdb().then(() => {
    App.listen(3000, () => {
        console.log("Server started on port 3000");
    });
});
