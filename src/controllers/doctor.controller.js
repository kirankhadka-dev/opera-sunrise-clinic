import UserModal from "../models/User.model";
const User = UserModal;

// @desc Get all users (Admin Only)
// @route GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete a user (Admin Only)
// @route DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Promote a user to admin (Admin Only)
// @route PUT /api/admin/users/:id/promote
const promoteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();

    res.json({ message: "User promoted to admin successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { promoteUser, getAllUsers, deleteUser };
