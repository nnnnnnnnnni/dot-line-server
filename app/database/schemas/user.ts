import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    password: String,
    secret: String,
    lastLogin: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

export const userModel = mongoose.model("user", userSchema);