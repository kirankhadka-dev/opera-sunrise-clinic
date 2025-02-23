import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    fullName: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "doctor", "patient"],
      default: "patient",
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre(
  ("save",
  async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = bcrypt.hash(this.password, 10);
    next();
  })
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
