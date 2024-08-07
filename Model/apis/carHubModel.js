const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  engine_type: {
    type: String,
    required: true,
  },
  horsepower: {
    type: Number,
    required: true,
  },
  fuel_efficiency: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  trims: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  safety_ratings: {
    type: String,
    required: true,
  },
  features: [String],
  dealerships: [String],
  availability: {
    type: String,
    required: true,
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
