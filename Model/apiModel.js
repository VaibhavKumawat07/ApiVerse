const mongoose = require("mongoose");

const apiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide ApiName."],
    unique: true,
  },
  title: {
    type: String,
    required: [true, "Please Provide Short Description."],
    unique: true,
  },
  description: {
    type: Array,
    required: [true, "Please Provide Description."],
  },
  image: {
    type: String,
    required: [true, "Please Provide Image."],
  },
  link: {
    type: String,
    required: [true, "Please Provide Api Link"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const api = mongoose.model("apis", apiSchema);
module.exports = api;
