const express = require("express");

import {
  prescribeMedication,
  getAllMedications,
  updateMedication,
  deleteMedication,
} from "../controllers/medication.controller";

const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const medicationRouter = express.Router();

// Routes (Only doctors, pharmacists, and admins can manage medications)
router.get(
  "/",
  protect,
  authorize(["admin", "doctor", "pharmacist"]),
  getAllMedications
);
router.get(
  "/:id",
  protect,
  authorize(["admin", "doctor", "pharmacist", "patient"]),
  getMedication
);
router.post("/", protect, authorize(["doctor"]), prescribeMedication);
router.put(
  "/:id",
  protect,
  authorize(["doctor", "pharmacist"]),
  updateMedication
);
router.delete("/:id", protect, authorize(["admin"]), deleteMedication);

export default medicationRouter;
