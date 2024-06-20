const express = require("express");
const users = require("../controllers/users.js");
const { isSignup, loginRedirect, isLoggedIn } = require("../middleware/users.js");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utility/wrapAsync.js");


router.route("/signup")
  .get(users.renderSignupForm)
  .post(users.userSignup)

let authObj = passport.authenticate('local', {
  failureRedirect: '/login',
  failureMessage: true,
  failureFlash: true
})


router.route("/login")
  .get(users.renderLoginForm)
  .post(
    loginRedirect,
    authObj, users.userLogin)

router.route("/logout")
  .get(users.userLogout);

router.route("/find")
  .post(wrapAsync(users.listUser));

router.route("/profile/:id/view")
  .get(users.viewProfile);


router.route("/profile/:id")
  .get(
    isLoggedIn,
    users.renderEditUser)
  .put(isLoggedIn,
    users.editUser)
  .delete(
    isLoggedIn,
    users.deleteUser)

router.route("/help")
  .get(users.helpPage)


module.exports = router;
