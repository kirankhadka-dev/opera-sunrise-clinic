import jwt from "jsonwebtoken";
import UserModal from "../models/User.model";
// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_TOKEN,
    {
      expiresIn: process.env.JWT_SECRET_EXPIRES,
    }
  );
};

// @desc Register a new user
// @route POST /api/auth/register
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await UserModal.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await UserModal.create({ name, email, password, role });
    res.status(201).json({ token: generateToken(user), user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Login user
// @route POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModal.findOne({ email });
    if (!user || !(await user.isCorrectPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ token: generateToken(user), user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get user profile
// @route GET /api/auth/profile
const getUserProfile = async (req, res) => {
  try {
    const user = await UserModal.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update user profile
// @route PUT /api/auth/profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await UserModal.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    if (req.body.password) user.password = req.body.password;

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete user account
// @route DELETE /api/auth/profile
const deleteUserAccount = async (req, res) => {
  try {
    await UserModal.findByIdAndDelete(req.user.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
};
