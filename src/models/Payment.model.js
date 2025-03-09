import mongoose, { Schema } from "mongoose";

const PaymentSchema = new Schema({
  invoiceId: { type: Schema.Types.ObjectId, ref: "Invoice", required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
});
const PaymentModel = model("Payment", PaymentSchema);

export default PaymentModel;
