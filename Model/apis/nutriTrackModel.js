const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  recipeName: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  nutrition: {
    calories: { type: Number, required: true },
    protein: { type: String, required: true },
    carbohydrates: { type: String, required: true },
    fat: { type: String, required: true },
  },
});

const foodSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  nutrition: {
    calories: { type: Number, required: true },
    protein: { type: String, required: true },
    carbohydrates: { type: String, required: true },
    fat: { type: String, required: true },
    fiber: { type: String },
    sugar: { type: String },
  },
  allergens: [{ type: String }],
  dietaryRestrictions: [{ type: String }],
  recipes: [recipeSchema],
});

const Food = mongoose.model("nutriTrack", foodSchema);

module.exports = Food;
