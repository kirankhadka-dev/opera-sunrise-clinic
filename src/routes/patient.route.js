import express from "express";

const {
  getAllPatients,
  getPatient,
  registerPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const patientRouter = express.Router();

// Routes (Only Admins and Receptionists can manage patients)
router.get("/", protect, authorize(["admin", "receptionist"]), getAllPatients);
router.get(
  "/:id",
  protect,
  authorize(["admin", "receptionist", "doctor"]),
  getPatient
);
router.post(
  "/",
  protect,
  authorize(["admin", "receptionist"]),
  registerPatient
);
router.put(
  "/:id",
  protect,
  authorize(["admin", "receptionist"]),
  updatePatient
);
router.delete("/:id", protect, authorize(["admin"]), deletePatient);

export default patientRouter;
