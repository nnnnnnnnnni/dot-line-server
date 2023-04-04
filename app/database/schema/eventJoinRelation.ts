import mongoose from "mongoose";
const eventJoinRelation = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
      require: true,
    },
    // 参与者
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    type: {
      type: String,
      enum: ["Participant", "Organizer", "Admin"],
      default: "Participant",
    },
    // 参与者状态
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    }
  },
  {
    timestamps: {
      createdAt: "joinAt",
    },
    versionKey: false,
  }
);

eventJoinRelation.index({ user: 1, event: 1, type: 1 }, { unique: true });

export const eventJoinRelationModel = mongoose.model("user", eventJoinRelation);