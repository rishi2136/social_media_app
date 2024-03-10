const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String
  },
  created_date: {
    type: String,
    default:  new Date(Date.now()).toString().split(' ').slice(1,4).join(" "), 
  } ,
  created_at: {
    type: String,
    default: new Date(Date.now()).toLocaleTimeString(),
  },
  creator_id: {
    type: String,
    required: true,
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;