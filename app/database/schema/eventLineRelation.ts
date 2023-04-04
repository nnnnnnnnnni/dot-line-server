import mongoose from "mongoose";
const eventLineRelation = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
      require: true,
    },
    related: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
      require: true,
    },
    order: {
      type: Number,
      default: 0,
      require: true,
    },
    next: {
      distance: {
        type: Number,
        default: 0,
      },
      time: {
        type: Number,
        default: 0,
      },
      cast: {
        type: Number,
        default: 0,
      }
    }
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
    versionKey: false,
  }
);

eventLineRelation.index({ event: 1, related: 1, order: 1 }, { unique: true })
eventLineRelation.index({ event: 1, order: 1 })
eventLineRelation.index({ related: 1, order: 1 })

export const eventLineRelationModel = mongoose.model("eventLineRelation", eventLineRelation);