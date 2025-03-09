import express from "express";

import {
  getAllNotifications,
  getNotification,
  createNotification,
  deleteNotification,
  getAllAuditLogs,
} from "../controllers/notificationAudit.controller.js";
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const notificationAuditRouter = express.Router();

// Notification Routes (All users can access their notifications)
router.get("/notifications", protect, getAllNotifications);
router.get("/notifications/:id", protect, getNotification);
router.post(
  "/notifications",
  protect,
  authorize(["admin"]),
  createNotification
);
router.delete(
  "/notifications/:id",
  protect,
  authorize(["admin"]),
  deleteNotification
);

// Audit Log Routes (Admin Only)
router.get("/audit-logs", protect, authorize(["admin"]), getAllAuditLogs);

export default notificationAuditRouter;
