import UserModal from "../models/User.model.js";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: process.env.JWT_SECRET_EXPIRES,
  });
};

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await UserModal.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await UserModal.create({ name, email, password, role });
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModal.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const profile = async (req, res) => {
  try {
    const user = await UserModal.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { loginUser, registerUser, profile };
