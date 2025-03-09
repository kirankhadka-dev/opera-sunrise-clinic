import express from "express";

const {
  getAllDiagnoses,
  getDiagnosis,
  recordDiagnosis,
  updateDiagnosis,
  deleteDiagnosis,
} = require("../controllers/diagnosisController");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const diagnosisRouter = express.Router();

// Routes (Only doctors and admins can manage diagnoses)
router.get("/", protect, authorize(["admin", "doctor"]), getAllDiagnoses);
router.get(
  "/:id",
  protect,
  authorize(["admin", "doctor", "patient"]),
  getDiagnosis
);
router.post("/", protect, authorize(["doctor"]), recordDiagnosis);
router.put("/:id", protect, authorize(["doctor"]), updateDiagnosis);
router.delete("/:id", protect, authorize(["admin"]), deleteDiagnosis);

export default diagnosisRouter;
