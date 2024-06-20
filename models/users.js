const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
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
  follower: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

module.exports = User;
