const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const User = require("./models/User.js");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const Post = require("./models/Post");
const app = express();
const fs = require("fs");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + '/uploads'));

const secret = "ejskEHSJDghja12ajejWJEJSq2eie";

// mongoose.connect(
//   "mongodb+srv://shivarajkulalsn884:Z8A1JzEZViRfCv7Q@cluster0.bfndkuf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// );

mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//request from RegisterPage.js and Request handling.
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userDoc = await User.create({
      username,
      password: hashedPassword,
    });
    res.json(userDoc);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    const { title, summary, content } = req.body;

    // Fetch the user's information (including username) from the database
    const user = await User.findById(info.id);

    // Create the post document with the author field populated
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: user, // Populate the author field with the user's information
    });
    res.json(postDoc);
  });
});

app.get('/post',async (req,res) => {
   res.json(await Post.find().populate('author',['username']).sort({createdAt:-1}).limit(20)
   );
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Z8A1JzEZViRfCv7Q
