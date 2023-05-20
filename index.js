require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Blog = require("./models/blog");
const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded());
const port = 3000;

mongoose.connect(
  "mongodb://aakashramesh018:aakash1404@ac-2gm5zin-shard-00-02.7pnu2ef.mongodb.net:27017/?authMechanism=DEFAULT&tls=true&tlsInsecure=true",
  { useNewUrlParser: true }
);

//Endpoints to sevre the HTML
app.get("/", (req, res) => {
  res.sendFile("HTML-pages/index.html", { root: __dirname });
});

app.get("/login", (req, res) => {
  res.sendFile("HTML-pages/login.html", { root: __dirname });
});

app.get("/signup", (req, res) => {
  res.sendFile("HTML-pages/signup.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("HTML-pages/about.html", { root: __dirname });
});

//Endpoints for the API
app.post("/get-blogs", async (req, res) => {
  const { usertoken } = req.body;
  let blogs = await Blog.find({ email: req.body.email });
  res.status(200).json({ success: true, blogs });
});

app.post("/login", async (req, res) => {
  const { usertoken } = req.body;
  let user = await User.findOne(req.body);
  if (!user) {
    res.status(200).json({ success: false, message: "No user found." });
  } else {
    res.status(200).json({
      success: true,
      user: { email: user.email },
      message: "User found.",
    });
  }
});

app.post("/signup", async (req, res) => {
  const { usertoken } = req.body;
  console.log(req.body);
  let user = await User.create(req.body);
  res.status(200).json({ success: true, user: user });
});

app.post("/", async (req, res) => {
  const { usertoken } = req.body;
  let blog = await Blog.create(req.body);
  res.status(200).json({ success: true, blog });
});

app.post("/delete-blog", async (req, res) => {
  const { usertoken } = req.body;
  let blog = await Blog.find({ email: req.body.email });
  res.status(200).json({ success: true, blog });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
