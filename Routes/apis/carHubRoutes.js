const express = require("express");
const router = express.Router();
const carHubController = require("./../../controller/apis/carHubController");
const authController = require("../../controller/authController");

router
  .route("/")
  .get(carHubController.getAll)
  .post(authController.authentication, carHubController.insert);
router.route("/:model").get(carHubController.getDetails);
router
  .route("/:id")
  .patch(authController.authentication, carHubController.UpdateDetail)
  .delete(authController.authentication, carHubController.deleteDetail);

module.exports = router;
