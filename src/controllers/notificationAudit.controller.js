const NotificationModel = require("../models/Notification");
const AuditLogModel = require("../models/AuditLog");

// @desc Get all notifications (User specific)
// @route GET /api/notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find({ userId: req.user.id });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get a specific notification
// @route GET /api/notifications/:id
const getNotification = async (req, res) => {
  try {
    const notification = await NotificationModel.findById(req.params.id);
    if (!notification || notification.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Create a notification (Admin Only)
// @route POST /api/notifications
const createNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const notification = await NotificationModel.create({
      userId,
      message,
      sentDate: new Date(),
    });
    res
      .status(201)
      .json({ message: "Notification created successfully", notification });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete a notification (Admin Only)
// @route DELETE /api/notifications/:id
const deleteNotification = async (req, res) => {
  try {
    const notification = await NotificationModel.findById(req.params.id);
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });

    await notification.deleteOne();
    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get all audit logs (Admin Only)
// @route GET /api/audit-logs
const getAllAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLogModel.find();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  getAllNotifications,
  createNotification,
  deleteNotification,
  getAllAuditLogs,
};
