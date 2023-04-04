import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    // 活动名称
    name: {
      type: String,
    },
    // 活动类型
    type: {
      type: String,
      enum: ["Offline", "Online"],
      default: "Online",
    },
    // 线上活动链接
    link: {
      type: String,
    },
    // 活动描述
    description: {
      type: String,
    },
    // 活动封面
    coverImage: {
      type: String,
    },
    // 活动开始时间
    startAt: {
      type: Date,
      require: true
    },
    // 活动结束时间
    endAt: {
      type: Date,
    },
    // 活动报名截止时间
    registrationDeadline: {
      type: Date,
    },
    // 活动地点
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      }
    },
    // 活动地址(详细地址 eg: 1号楼2单元)
    address: {
      type: String,
    },
    // 活动状态
    status: {
      type: String,
      enum: ["Draft", "Published", "Canceled", "Deleted"],
      default: "Draft"
    },
    // 点赞数
    like: {
      type: Number,
      default: 0,
    },
    // 关注数
    follow: {
      type: Number,
      default: 0,
    },
    config: {
      // 是否允许参与
      canJoin: {
        type: Boolean,
        default: true
      },
      // 是否需要审核
      needApprove: {
        type: Boolean,
        default: false
      },
      // 活动时区
      timezone: {
        type: String,
      },
      // 最大参与人数
      max: {
        type: Number,
        default: 0
      },
    },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
    versionKey: false,
  }
);

userSchema.index({ location: "2dsphere" });
userSchema.index({ createAt: -1 });
userSchema.index({ type: -1 });

export const eventModel = mongoose.model("user", userSchema);