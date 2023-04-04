
import mongoose from "mongoose";
const eventCommentRelation = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
      require: true,
    },
    // 评论者
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    // 评论内容
    text: {
      type: String,
      require: true,
    },
    // 回复的评论
    quote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "eventCommentRelation",
    },
    // 点赞数
    like: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
    versionKey: false,
  }
);

eventCommentRelation.index({ event: 1 });
eventCommentRelation.index({ createdAt: -1 });
eventCommentRelation.index({ creator: 1 });
eventCommentRelation.index({ quote: 1 });

export const eventCommentRelationModel = mongoose.model("user", eventCommentRelation);