const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true },
    sentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const AuditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: { type: String, required: true },
    date: { type: Date, default: Date.now },
    ipAddress: { type: String, required: true },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model("Notification", NotificationSchema);
const AuditLogModel = mongoose.model("AuditLog", AuditLogSchema);

export { NotificationModel, AuditLogModel };
