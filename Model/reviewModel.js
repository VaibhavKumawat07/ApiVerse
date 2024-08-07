const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name."],
  },
  user_review: {
    type: String,
    unique: true,
    required: [true, "Please provide your valubale review or feedback."],
    maxlength: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const review = mongoose.model("reviews", reviewSchema);

module.exports = review;
