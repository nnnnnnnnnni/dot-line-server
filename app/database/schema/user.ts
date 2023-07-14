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
    // 是否私密
    private: {
      type: Boolean,
      default: false,
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

export const userModel = mongoose.model("user", userSchema);