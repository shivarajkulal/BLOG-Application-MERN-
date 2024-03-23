const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/User.js");
const app = express();

app.use(cors({credentials:true,origin:'http://localhost:3000' }));
app.use(express.json());

const secret = "ejskEHSJDghja12ajejWJEJSq2eie";

// mongoose.connect(
//   "mongodb+srv://shivarajkulalsn884:Z8A1JzEZViRfCv7Q@cluster0.bfndkuf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// );

mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Z8A1JzEZViRfCv7Q

//request from RegisterPage.js
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
  const passOk = await bcrypt.compare(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json("ok");
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Z8A1JzEZViRfCv7Q
