import express from "express";

const {
  getAllDoctors,
  getDoctor,
  registerDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const doctorRouter = express.Router();

// Routes (Only Admins can manage doctors)
router.get("/", protect, authorize(["admin"]), getAllDoctors);
router.get("/:id", protect, authorize(["admin", "doctor"]), getDoctor);
router.post("/", protect, authorize(["admin"]), registerDoctor);
router.put("/:id", protect, authorize(["admin"]), updateDoctor);
router.delete("/:id", protect, authorize(["admin"]), deleteDoctor);

export default doctorRouter;
