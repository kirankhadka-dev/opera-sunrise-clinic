import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
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
    testType: { type: String, required: true },
    date: { type: Date, required: true },
    result: { type: String, required: true },
  },
  { timestamps: true }
);

const TestModel = mongoose.model("Test", TestSchema);

export default TestModel;
