import mongoose, { Schema } from "mongoose";

const PatientSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bloodType: String,
  insuranceId: { type: Schema.Types.ObjectId, ref: "Insurance" },
  medicalHistory: [{ type: Schema.Types.ObjectId, ref: "MedicalHistory" }],
  appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
  bedAssignment: { type: Schema.Types.ObjectId, ref: "BedAssignment" },
});
const PatientModal = model("Patient", PatientSchema);

export default PatientSchema;
