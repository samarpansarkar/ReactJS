const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      required: true,
      default: "BookOpen",
    },
    color: {
      type: String,
      default: "text-gray-500",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
