import express from "express";
import {
  getAllAppointments,
  getAppointment,
  bookAppointment,
  updateAppointment,
  cancelAppointment,
} from "../controllers/appointment.controller";

const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const appointmentRouter = express.Router();

// Routes (Admin, Receptionist, Doctor, and Patients can access appointments)
router.get(
  "/",
  protect,
  authorize(["admin", "receptionist", "doctor"]),
  getAllAppointments
);
router.get(
  "/:id",
  protect,
  authorize(["admin", "receptionist", "doctor", "patient"]),
  getAppointment
);
router.post(
  "/",
  protect,
  authorize(["admin", "receptionist", "patient"]),
  bookAppointment
);
router.put(
  "/:id",
  protect,
  authorize(["admin", "receptionist"]),
  updateAppointment
);
router.delete(
  "/:id",
  protect,
  authorize(["admin", "receptionist"]),
  cancelAppointment
);

export default appointmentRouter;
