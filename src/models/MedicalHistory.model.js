import mongoose, { Schema } from "mongoose";
const MedicalHistorySchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  entryDate: { type: Date, required: true },
  description: { type: String, required: true },
});
const MedicalHistoryModel = model("MedicalHistory", MedicalHistorySchema);

export default MedicalHistoryModel;
