const express = require("express");
const router = express.Router();
const viewController = require("./../controller/viewController");
const userController = require("./../controller/userController");
const authController = require("./../controller/authController");

router.route("/apiVerse/signup").get(viewController.renderSign);
router.route("/").get(viewController.renderIndex);
router.route("/apiVerse/login").get(viewController.renderLogin);
router.route("/apiVerse/resetPassword/:token").get(viewController.renderReset);
router.route("/apiVerse/forgotPassword").get(viewController.renderForgot);
router
  .route("/apiVerse/api")
  .get(authController.authentication, viewController.renderApi);
router
  .route("/apiVerse/apiPage")
  .get(authController.authentication, viewController.renderApiPage);
router
  .route("/apiVerse/profile")
  .get(authController.authentication, viewController.renderProfile);

module.exports = router;
