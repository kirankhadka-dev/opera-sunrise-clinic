import express from "express";

import authorize from "../middlewares/authorization.middleware.js";
import { authentication } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/users", protect, authorize(["admin"]), getAllUsers);
router.delete("/users/:id", protect, authorize(["admin"]), deleteUser);
router.put("/users/:id/promote", protect, authorize(["admin"]), promoteUser);

module.exports = router;
