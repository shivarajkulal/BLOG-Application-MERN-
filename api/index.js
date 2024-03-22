const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User.js");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://shivarajkulalsn884:Z8A1JzEZViRfCv7Q@cluster0.bfndkuf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.create({username, password}); 
  res.json(userDoc);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Z8A1JzEZViRfCv7Q