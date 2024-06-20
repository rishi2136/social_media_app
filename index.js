const express = require("express");
const app = express();
const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require('method-override')
var cookieParser = require('cookie-parser')
const flash = require("connect-flash");
const Post = require("./models/posts");
const User = require("./models/users");
const bodyParser = require('body-parser');
const ExpressError = require("./utility/ExpressError.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
// const ejsLint = require('ejs-lint');
const axios = require('axios');


const mongoose = require('mongoose');
const port = process.env.PORT;

app.use(bodyParser.json())
// app.use(ejsLint());

main()
  .then(() => {
    console.log("connected wih the database")
  })
  .catch((err) => {
    console.log("Can't connect with database we encounter a error: ", err);
  })

async function main() {
  // await mongoose.connect(process.env.MONGOATLAS_URL);
  await mongoose.connect(process.env.MONGO_URL);
}

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

const sessionOptions = {
  secret: "mysupersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 2,
    maxAge: 1000 * 60 * 60 * 24 * 2,
    httpOnly: true //to prevent from cross scripting attacks
  }
}

app.use(cookieParser("mysupersecret"));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(express.static(path.join(__dirname, 'public')));
//for apply other operation like put, patch, delete etc
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

app.use(express.json());

app.use((req, res, next) => {
  res.locals.msg = req.flash("info");
  res.locals.err = req.flash("err");
  res.locals.currUser = req.user;
  res.locals.path = req.path;
  next();
})


// const authRouter = require("./routes/security");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");


app.use("/posts", postRouter);

app.use('/', userRouter);


// * work for all the routes that don't exist 
// app.all("*", (req, res, next) => {
//   let err = new ExpressError(404, "Page not found");
//   next(err);
// })

//error handling middleware
app.use((err, req, res, next) => {
  let { statusCode, message } = err;
  console.log(err.name);
  res.render("./listings/error.ejs", { message })
})


app.listen(port, () => {
  console.log(`The server is listening at ${port}`);
})