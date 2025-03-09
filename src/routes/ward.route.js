const express = require("express");
import {
  getAllWards,
  getWard,
  addWard,
  updateWard,
  deleteWard,
  getAllBeds,
  getBed,
  assignBed,
  updateBedAssignment,
  removeBedAssignment,
} from "../controllers/ward.controller.js";

const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const wardRouter = express.Router();

// Ward Routes (Admin & Receptionist can manage wards)
router.get(
  "/wards",
  protect,
  authorize(["admin", "receptionist"]),
  getAllWards
);
router.get(
  "/wards/:id",
  protect,
  authorize(["admin", "receptionist"]),
  getWard
);
router.post("/wards", protect, authorize(["admin"]), addWard);
router.put("/wards/:id", protect, authorize(["admin"]), updateWard);
router.delete("/wards/:id", protect, authorize(["admin"]), deleteWard);

// Bed Routes (Admin & Receptionist can manage bed assignments)
router.get("/beds", protect, authorize(["admin", "receptionist"]), getAllBeds);
router.get("/beds/:id", protect, authorize(["admin", "receptionist"]), getBed);
router.post("/beds", protect, authorize(["admin", "receptionist"]), assignBed);
router.put(
  "/beds/:id",
  protect,
  authorize(["admin", "receptionist"]),
  updateBedAssignment
);
router.delete("/beds/:id", protect, authorize(["admin"]), removeBedAssignment);

export default wardRouter;
