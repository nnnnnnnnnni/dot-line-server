import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    // 昵称（用户名）
    username: {
      type: String,
      require: true,
    },
    // 密码
    password: {
      type: String,
    },
    // 邮箱
    email: {
      type: String,
      unique: true,
    },
    // 手机号
    phone: {
      type: String,
      unique: true,
    },
    // 头像
    avatar: {
      type: String,
    },
    // 个人简介
    bio: {
      type: String,
    },
    // 定位地点
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      }
    },
    // 详细地址( eg: 1号楼2单元)
    address: {
      type: String,
    },
    // 最后登录时间
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

userSchema.index({ location: "2dsphere" });

export const userModel = mongoose.model("user", userSchema);