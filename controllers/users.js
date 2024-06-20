const User = require("../models/users");
const Post = require("../models/posts");
const ExpressError = require("../utility/ExpressError");


module.exports.renderSignupForm = (req, res) => {
  res.render("./user/signUp.ejs");
}


module.exports.userSignup = async (req, res) => {
  try {
    let { username, password, email } = req.body;
    let newUser = await User({
      username, email
    })
    let registerUser = await User.register(newUser, password);
    console.log(registerUser);

    req.login(registerUser, (err) => {
      if (err) {
        next(err.message)
      }
      req.flash("success", "Welcome the spread!");
      res.redirect("/posts");

    })

  } catch (err) {
    req.flash("err", err.message);
    res.redirect("/signup");
  }

}

module.exports.renderLoginForm = (req, res) => {
  res.render("./user/login.ejs");
}

module.exports.userLogin = (req, res) => {
  req.flash("info", "You are logged in to Spread!");
  //sometime isLoggedIn mw not triggered at all

  let redirect = res.locals.redirectUrl || "/posts";
  res.redirect(redirect);
}

module.exports.userLogout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err.message);
    }
    req.flash("info", "You logged out successfully")
    res.redirect("/posts");
  })
}


module.exports.viewProfile = async (req, res) => {
  let { id } = req.params;
  let user = await User.findById(id);
  let posts = await Post.find({ creator: user.id });
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
  let updateUser = await User.findByIdAndUpdate(id,
    //  { username: user.username, profile_url: user.profile_url, bio: user.bio }
    { ...user }, { runValidators: true });
  console.log(updateUser);
  res.redirect(`/profile/${id}/view`);
}

module.exports.deleteUser = async (req, res) => {

  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return res.status(404).json({ error: 'User not found' });
  }
  console.log("User deleted");
  res.redirect("/posts");
}


module.exports.listUser = async (req, res, next) => {
  let { username } = req.body;
  let users = await User.find({ username: { $regex: `^${username}`, $options: 'i' } }).limit(10);
  if (users.length === 0) {
    return res.json(users);
  }
  res.json(users);



}


module.exports.helpPage = (req, res) => {
  res.render("./listings/help.ejs");
}
