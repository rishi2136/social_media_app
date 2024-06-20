const express = require("express");
const app = express();

//custom path to access the .env file
require('dotenv').config({ path: '../.env' });


const mongoose = require('mongoose');
const port = process.env.PORT;
console.log(port);

const randomPosts = require("./sampleData");

app.set(express.urlencoded({ extended: true }));

const Post = require("../models/posts");
const User = require("../models/users");


main()
  .then(() => {
    console.log("connected wih the database")
  })
  .catch((err) => {
    console.log("Can't connect with database we encounter a error: ", err);
  })

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.get("/init", async (req, res) => {
  // await User.deleteMany({});
  // createUser();

  await Post.deleteMany({});
  let user = await User.findOne({ username: "demo" });
  console.log(user);
  let samplePosts = randomPosts.map(obj => ({ ...obj, creator: user._id, likes: [] }));
  let posts = await Post.insertMany(samplePosts);
  console.log(posts);
  res.send("post created");
})

//if you want to create primary user
let createUser = async () => {
  let user1 = new User({
    username: "John carter",
    password: "carter",
    email: "carter@gmail.com",
    bio: "Love to collaborate with the peoples and communities",
    profile_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    follower: [],
    following: []
  });
  await user1.save();
  console.log(user1);
}

app.listen(3000, () => {
  console.log(`The server is listening at 3000`);
});