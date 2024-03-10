const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require('method-override')
const ExpressError = require("./utility/expressError");
var cookieParser = require('cookie-parser')
const Post = require("./models/posts");
const User = require("./models/users");

const mongoose = require('mongoose');
const port = process.env.PORT;

main()
.then(()=> {
  console.log("connected wih the database")
})
.catch((err)=>{
console.log("Can't connect with database we encounter a error: ", err);
})

async function main() {
  await mongoose.connect(process.env.MONGOATLAS_URL);
}

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

app.use(cookieParser("mysecretkey"));


app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

app.use(express.json());

app.get("/verify", (req, res)=>{
res.render("./user/login.ejs");
})

app.post("/login", async (req, res)=>{
let {email} = req.body;
console.log(email);
let user = await User.findOne({email: email});
let options = {
  maxAge: 1000 * 60 * 60 * 24, // would expire after 1 day
  httpOnly: true, 
  signed: true 
}
res.cookie('user_id',user.id, options);
res.redirect("/posts");
})

app.get("/logout", async (req, res)=>{
  let val = res.clearCookie("user_id")
  console.log(val);
  res.redirect("/posts");
})

const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");

app.use(postRouter);
app.use(userRouter);



app.get("*", (err, req, res)=>{
  let {statusCode, message} =  new ExpressError(404, "Page not found");
  console.log(message);
  res.send("page not found");
})



app.listen(port, ()=>{
  console.log(`The server is listening at ${port}`);
})