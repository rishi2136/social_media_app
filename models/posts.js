const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_date: {
    type: String,
    default: new Date(Date.now()).toString().split(' ').slice(1, 4).join(" "),
  },
  created_at: {
    type: String,
    default: new Date(Date.now()).toLocaleTimeString(),
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }]
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;