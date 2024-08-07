const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  muscleGroup: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  tips: {
    type: [String],
    required: false,
  },
});

const Exercise = mongoose.model("fitFlex", exerciseSchema);

module.exports = Exercise;
