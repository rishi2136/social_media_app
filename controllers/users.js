const User = require("../models/users");
const Post = require("../models/posts");

module.exports.renderAddForm = (req, res)=>{
res.render("./user/createUser.ejs");
}

module.exports.addUser =  async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ error: 'Username and email are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const newUser = new User({ username, email });
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.redirect("/posts")
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};






module.exports.viewProfile = async (req, res) => {
  let { id } = req.params;
  let user = await User.findById(id);
  let posts = await Post.find({ creator_id: user.id });
  res.render("./user/profile.ejs", { user, posts });
}


module.exports.renderEditUser = async (req, res) => {
  let { id } = req.params;
  let user = await User.findById(id);
  res.render("./user/editUser.ejs", { user });
}

module.exports.editUser = async (req, res) => {
  let { user } = req.body;
  let { id } = req.params;
  let updateUser = await User.findByIdAndUpdate(id, { username: user.username, profile_url: user.profile_url, bio: user.bio }, {runValidators: true});
  console.log(updateUser);
  res.redirect(`/profile/${id}/view`);
}

module.exports.deleteUser = async (req, res) => {
  
    const { id }= req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log("User deleted");
    res.redirect("/posts");
  }
