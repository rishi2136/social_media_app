const Post = require("../models/posts");



module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    if (req.query._method == 'DELETE') {
      req.session.redirectUrl = "/posts";
    } else if (req.path.includes("/likes") === true) {
      req.session.redirectUrl = "/posts";
    } else {
      req.session.redirectUrl = req.originalUrl;
    }
    req.flash("err", "You must logged in to the Spread");
    res.redirect("/login");
  } else {
    next();
  }

}

//its can save the redirect path in the locals before the passport reset the session object
module.exports.loginRedirect = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

module.exports.isCreator = async (req, res, next) => {
  const { id } = req.params;
  let oldPost = await Post.findById(id)
  if (!res.locals.currUser._id.equals(oldPost.creator._id)) {
    req.flash("err", "You are not the creator of this post");
    return res.redirect("/posts");
  }
  next();
}