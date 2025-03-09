import express from "express";

const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");
const { getPatientProfile } = require("../controllers/patientController");

const patientRouter = express.Router();

router.get("/profile", protect, authorize(["patient"]), getPatientProfile);

export default patientRouter;
