const express = require("express");
const router = express.Router();
const userController = require("./../controller/userController");
const authController = require("./../controller/authController");

router.route("/forgotPassword").post(userController.forgotPassword);
router.route("/resetPassword/:token").patch(userController.resetPassword);
router.route("/profile").get(authController.logedin);

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);

router
  .route("/logout")
  .get(authController.authentication, userController.logout);
router
  .route("/updatePassword")
  .patch(authController.authentication, userController.updatePassword);

router
  .route("/deleteUser")
  .get(authController.authentication, userController.deleteUser);
router
  .route("/")
  .get(authController.authentication, userController.getAllUser)
  .post(authController.authentication, userController.getUser)
  .patch(authController.authentication, userController.updateUser);

module.exports = router;
