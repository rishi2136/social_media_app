const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bio: {
        type: String,
        default: ""
    },
    profile_url: {
        type: String,
        default: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    follower:{
      type: Number,
      default: 0
    },
    following:{
      type: Number,
      default: 0
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
