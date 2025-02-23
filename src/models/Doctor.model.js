const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialization: { type: String },
  licenseNumber: { type: String, unique: true },
  experienceYears: { type: Number },
});

const DoctorModel = mongoose.model("Doctor", doctorSchema);

export default DoctorModel;
