const mongoose = require("mongoose");

const topicSchema = mongoose.Schema(
  {
    topicId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "Box",
    },
    category: {
      type: String, // e.g., 'core', 'advanced', 'patterns'
      required: true,
    },
    section: {
      type: String, // e.g., 'hooks', 'concepts' - top level grouping
      required: true,
      default: "hooks",
    },
    subject: {
      type: String, // e.g., 'react', 'js' - matches Subject path or id
      required: true,
      default: "react",
    },
    description: {
      type: String,
    },
    componentKey: {
      type: String, // Map to frontend component registry e.g. 'UseStateDemo'
    },
    liveCode: {
      type: String, // Dynamic code string for live rendering
    },
    theory: {
      overview: String,
      definition: String,
      syntax: String,
      realLifeScenario: String,
      deepDive: String,
      pros: [String],
      cons: [String],
      whenToUse: [String],
      tips: [String],
      commonPitfalls: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
