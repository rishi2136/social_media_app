const mongoose = require('mongoose');
const Post = require("../models/posts");
const User = require("../models/users");

module.exports.homeScreen = async (req, res) => {
  let posts = await Post.find();
  let users = await User.find({});
  res.render("./listings/home.ejs", { posts, users });
}


module.exports.renderAddForm = (req, res) => {
  res.render("./listings/create.ejs");
}

module.exports.addPost = async (req, res) => {
    const { title, content } = req.body;
    const newPost = new Post({
      title: title,
      content: content,
    });
    let {user_id} = req.signedCookies;
    newPost.creator_id = user_id;
    let savedPost = await newPost.save();
    console.log(savedPost);
    res.redirect("/posts");
}

module.exports.viewIndividualPost = async (req, res)=> {
  let {  id } = req.params;
  let post = await Post.findById(id);
  let user = await User.findById(post.creator_id);
  res.render("./listings/view.ejs", { post, user })
}

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let post = await Post.findById(id);
  res.render("./listings/edit.ejs", { post });
}

module.exports.editPost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  let post = await Post.findByIdAndUpdate(id, {
    title, content,
    created_at: new Date(Date.now()).toLocaleTimeString(),
    created_date: new Date(Date.now()).toString().split(' ').slice(1, 4).join(" "),
  },  {runValidators: true});
  res.redirect("/posts");
}

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  let post = await Post.findByIdAndDelete(id);
  console.log(post);
  res.redirect("/posts");
}

