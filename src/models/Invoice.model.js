import mongoose, { Schema } from "mongoose";

const InvoiceSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  issueDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid"], required: true },
});
const InvoiceModel = model("Invoice", InvoiceSchema);

export default InvoiceModel;
