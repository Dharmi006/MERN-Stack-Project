const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();

    // ✅ also return token on signup so user is logged in immediately
    const token = jwt.sign({ id: newUser._id }, "mysecretkey");
    res.json({ message: "User Registered Successfully", token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Wrong password" });
    }

    // ✅ sign with found user's _id
    const token = jwt.sign({ id: user._id }, "mysecretkey");
    res.json({ message: "Login Successful", token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};