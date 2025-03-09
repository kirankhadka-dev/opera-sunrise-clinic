import mongoose, { Schema } from "mongoose";

const WardSchema = new Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
});
const WardModel = model("Ward", WardSchema);

export default WardModel;
