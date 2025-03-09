import TestModel from "../models/Test.model";

import {
  getAllTests,
  updateTest,
  recordTest,
  getTest,
  deleteTest,
} from "../controllers/test.controller";
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const testRouter = express.Router();

// Routes (Only doctors, lab staff, and admins can manage test results)
router.get(
  "/",
  protect,
  authorize(["admin", "doctor", "lab_staff"]),
  getAllTests
);
router.get(
  "/:id",
  protect,
  authorize(["admin", "doctor", "lab_staff", "patient"]),
  getTest
);
router.post("/", protect, authorize(["doctor", "lab_staff"]), recordTest);
router.put("/:id", protect, authorize(["doctor", "lab_staff"]), updateTest);
router.delete("/:id", protect, authorize(["admin"]), deleteTest);

export default testRouter;
