const User = require("../models/User.model");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist, you can login", success: false });
    }
    const newUser = await new User({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in registering user", success: false, error });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const errorMsg = "Login failed , email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign({email: user.email, id : user._id}, process.env.JWT_SECRET, { expiresIn: '1d'})
    res
      .status(200)
      .json({ message: "Login successfully",
         success: true,
        jwtToken,
         email,
         name : user.name });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in login user", success: false, error });
  }
};
module.exports = {
  signup,
  login
};
