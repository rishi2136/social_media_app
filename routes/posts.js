const express = require("express");
const posts = require("../controllers/posts");
const router = express.Router();
const wrapAsync = require("../utility/wrapAsync");
const { isLoggedIn, loginRedirect, isCreator } = require('../middleware/users');
const { validatePost } = require("../middleware/posts");

router.route("/").get(wrapAsync(posts.homeScreen));

router.route("/trending")
  .get(
    wrapAsync(posts.trendingPost)
  )


router
  .route("/new")
  .get(
    isLoggedIn,
    posts.renderAddForm)
  .post(
    isLoggedIn,
    validatePost,
    wrapAsync(posts.addPost));


router.route("/likes/:id")
  .post(
    isLoggedIn,
    wrapAsync(posts.likedPost)
  )


router
  .route("/:id")
  .get(
    isLoggedIn,
    isCreator,
    posts.renderEditForm)
  .put(
    isLoggedIn,
    isCreator,
    validatePost,
    wrapAsync(posts.editPost))
  .delete(
    isLoggedIn,
    isCreator,
    wrapAsync(posts.deletePost));


router.route("/:id/view").get(wrapAsync(posts.viewIndividualPost));


module.exports = router;
