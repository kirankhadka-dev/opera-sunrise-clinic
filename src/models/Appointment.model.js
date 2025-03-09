import mongoose, { Schema } from "mongoose";
const AppointmentSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  purpose: { type: String, required: true },
});
const AppointmentModel = model("Appointment", AppointmentSchema);

export default AppointmentModel;
