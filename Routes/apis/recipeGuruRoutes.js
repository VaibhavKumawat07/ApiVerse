const express = require("express");
const router = express.Router();
const recipeController = require("./../../controller/apis/recipeGuruController");
const authController = require("../../controller/authController");

router
  .route("/")
  .get(recipeController.getAllFoodRecipes)
  .post(authController.authentication, recipeController.insert);
router.route("/:name").get(recipeController.getFoodRecipeByName);
router
  .route("/:id")
  .patch(authController.authentication, recipeController.UpdateRecipe)
  .delete(authController.authentication, recipeController.deleteRecipe);

module.exports = router;
