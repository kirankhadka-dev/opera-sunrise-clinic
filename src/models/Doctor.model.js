import mongoose, { Schema } from "mongoose";
const DoctorSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  specialty: { type: String, required: true },
  patientsTreated: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
  diagnoses: [{ type: Schema.Types.ObjectId, ref: "Diagnosis" }],
});
const DoctorModal = model("Doctor", DoctorSchema);

export default DoctorModal;
