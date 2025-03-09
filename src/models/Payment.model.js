const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    issueDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const PaymentSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },
    paymentDate: { type: Date, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const InvoiceModel = mongoose.model("Invoice", InvoiceSchema);
const PaymentModel = mongoose.model("Payment", PaymentSchema);

export { InvoiceModel, PaymentModel };
