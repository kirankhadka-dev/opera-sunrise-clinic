import express from "express";

const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");
const { getDoctorDashboard } = require("../controllers/doctorController");

const doctorRouter = express.Router();

router.get("/dashboard", protect, authorize(["doctor"]), getDoctorDashboard);

export default doctorRouter;
