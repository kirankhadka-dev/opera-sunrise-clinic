const mongoose = require("mongoose");

const MedicationSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    medicationName: { type: String, required: true },
    dosage: { type: String, required: true },
    instructions: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
  },
  { timestamps: true }
);

const MedicationModel = mongoose.model("Medication", MedicationSchema);

export default MedicationModel;
