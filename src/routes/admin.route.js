import express from "express";

const {
  getAllUsers,
  deleteUser,
  promoteUser,
} = require("../controllers/adminController");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const adminRouter = express.Router();

router.get("/users", protect, authorize(["admin"]), getAllUsers);
router.delete("/users/:id", protect, authorize(["admin"]), deleteUser);
router.put("/users/:id/promote", protect, authorize(["admin"]), promoteUser);

export default adminRouter;
