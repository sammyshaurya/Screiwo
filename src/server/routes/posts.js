import express from "express";
import cors from "cors";
import Posts from "../../models/Posts.model.js";
import {verifyUser} from './fetchData.js';

const posts = express.Router();
posts.use(cors());

posts.get('/api/user/allposts', verifyUser, async (req, res) => {
    const token = req.headers.authorization;
    const userId = req.user._id;
    Posts.find({ userid: userId })
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            console.error("Error fetching posts:", error);
            res.status(500).json({ error: "Internal server error" });
        });
});

posts.post("/api/users/createpost", verifyUser, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send("Title and content are required");
  }
  try {
    const newPost = new Posts({
      userid: req.user._id,
      title: title,
      content: content,
    });
    await newPost.save();
    
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default posts;
