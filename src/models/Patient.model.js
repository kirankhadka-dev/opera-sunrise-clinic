const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  age: { type: Number },
  gender: { type: String, enum: ["male", "female", "other"] },
  contactNumber: { type: String },
  address: { type: String },
  medicalHistory: { type: String },
});

const PatientModel = mongoose.model("Patient", patientSchema);

export default PatientModel;
