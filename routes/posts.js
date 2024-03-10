const express = require("express");
const posts = require("../controllers/posts");
const router = express.Router();
const wrapAsync = require("../utility/wrapAsync");

router.route("/posts").get(wrapAsync(posts.homeScreen));

router
  .route("/posts/new")
  .get(posts.renderAddForm)
  .post(wrapAsync(posts.addPost));

router
  .route("/posts/:id")
  .get(wrapAsync(posts.renderEditForm))
  .put(wrapAsync(posts.editPost))
  .delete(wrapAsync(posts.deletePost));

router.route("/posts/:id/view").get(wrapAsync(posts.viewIndividualPost));

module.exports = router;
