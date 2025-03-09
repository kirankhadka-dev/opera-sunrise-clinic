import express from "express";
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

import { authentication } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authentication, getProfile);

export default router;
