
const Post = require("../models/posts");

const ExpressError = require('../utility/ExpressError');





module.exports.homeScreen = async (req, res) => {
  let posts = await Post.find({}).populate('creator');
  res.render("./listings/home.ejs", { posts });
}


module.exports.renderAddForm = (req, res) => {

  res.render("./listings/create.ejs");
}

module.exports.addPost = async (req, res, next) => {

  let { post } = req.body;
  let { title, content } = post;
  // const user = await User.findOne();
  const newPost = new Post({
    title, content,
    creator: req.user.id
  });
  let savedPost = await newPost.save();
  req.flash("info", "Your listing is add");
  console.log(savedPost);
  res.redirect("/posts");
}



module.exports.viewIndividualPost = async (req, res) => {
  let { id } = req.params;
  let post = await Post.findById(id).populate('creator');
  res.render("./listings/view.ejs", { post })
}

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let post = await Post.findById(id);
  res.render("./listings/edit.ejs", { post });
}

module.exports.editPost = async (req, res, next) => {

  const { id } = req.params;
  let { post } = req.body;
  let { title, content } = post;
  let updatePost = await Post.findByIdAndUpdate(id, {
    title, content,
    created_at: new Date(Date.now()).toLocaleTimeString(),
    created_date: new Date(Date.now()).toString().split(' ').slice(1, 4).join(" "),
  }, { runValidators: true, new: true });
  //runValidator ---> to validate the schema during updation
  //new ---> to print the updated object through variable
  req.flash("info", "Post is Updated");
  res.redirect("/posts");
}

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  let post = await Post.findByIdAndDelete(id);
  // if(currUser._id == post.creator._id) {}
  if (post) {
    req.flash("err", "Post is deleted just now");
    console.log("This post is deleted \n", post);
    res.redirect("/posts");
  }
}


module.exports.likedPost = async (req, res, next) => {
  let { id } = req.params;
  let post = await Post.findById(id);
  if (!post) {
    next(new ExpressError("500", "bad Request"));
  }
  if (post.likes.includes(res.locals.currUser.id)) {
    return res.json({ isliked: true, msg: "Already liked the post" });
  }
  post.likes.push(res.locals.currUser.id);
  await post.save();
  return res.json({ isliked: false, msg: "You liked the post, refresh the page to see the like" });
};


module.exports.trendingPost = async (req, res) => {
  let posts = await Post.find({
    $expr: {
      $gte: [
        { $size: "$likes" },
        3
      ]
    }
  }).populate('creator');
  res.render("./listings/home.ejs", { posts });
}


