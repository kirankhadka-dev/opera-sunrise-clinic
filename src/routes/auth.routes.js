import express from "express";
import {
  registerUser,
  getUserProfile,
  loginUser,
  updateUserProfile,
  getUserProfile,
  deleteUserAccount,
} from "../controllers/auth.controller";

import { authentication } from "../middlewares/auth.middleware";

const authRouter = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authentication, getUserProfile);
router.put("/profile", authentication, updateUserProfile);
router.delete("/profile", authentication, deleteUserAccount);

export default authRouter;
