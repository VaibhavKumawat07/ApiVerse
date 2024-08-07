const mongoose = require("mongoose");

const recipeGuruSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide food name to get recipe....."],
    unique: true,
  },
  cuisine: {
    type: String,
    required: [true, "Plaease provide cisuine..."],
  },
  mealType: {
    type: String,
    required: [true, "Plaease provide type of food..."],
  },
  dietaryNeeds: {
    type: String,
    required: [true, "Plaease provide dietaryNeeds..."],
  },

  ingredients: {
    type: Array,
    required: [true, "Plaease provide food ingredients..."],
  },
  instructions: {
    type: Array,
    required: [true, "Plaease provide recipe..."],
  },
  nutritionalInfo: {
    type: Object,
    required: [true, "Plaease provide nutritionInfo..."],
  },
  substitutions: {
    type: Array,
    required: [true, "Plaease provide substitutions..."],
  },
  mealPlanning: {
    type: Object,
    required: [true, "Plaease provide mealPlanning..."],
  },
});

const recipe = mongoose.model("recipeGuru", recipeGuruSchema);
module.exports = recipe;
