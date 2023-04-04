import mongoose from "mongoose";
const eventActionHistory = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
      require: true,
    },
    // 操作者
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    type: {
      type: String,
      enum: ["Join", "Leave", "Approve", "Reject", "Cancel", "Delete", "Update", "Comment", "Like", "Dislike", "Follow", "Unfollow"],
      default: "Join",
      require: true,
    },
    // 参与者
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
    versionKey: false,
  }
);

eventActionHistory.index({ event: 1, createdAt: -1 });

export const eventActionHistoryModel = mongoose.model("user", eventActionHistory);