import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["patient", "doctor", "receptionist", "admin"],
    required: true,
  },
  contactInfo: String,
  address: String,
  dateOfBirth: Date,
  createdAt: { type: Date, default: Date.now },
});
const UserModal = model("User", UserSchema);

export default UserModal;
