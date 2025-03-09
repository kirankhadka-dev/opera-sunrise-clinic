import mongoose, { Schema } from "mongoose";

const DiagnosisSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  date: { type: Date, required: true },
  notes: { type: String, required: true },
});
const DiagnosisModal = model("Diagnosis", DiagnosisSchema);

export default DiagnosisModal;
