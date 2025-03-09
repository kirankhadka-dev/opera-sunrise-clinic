import mongoose, { Schema } from "mongoose";

const BedAssignmentSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  bedId: { type: Schema.Types.ObjectId, ref: "Bed", required: true },
  admissionDate: { type: Date, required: true },
  dischargeDate: Date,
});
const BedAssignmentModel = model("BedAssignment", BedAssignmentSchema);

export default BedAssignmentModel;
