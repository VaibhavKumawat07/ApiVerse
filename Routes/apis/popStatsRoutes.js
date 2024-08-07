const express = require("express");
const router = express.Router();
const popStatsController = require("./../../controller/apis/popStatsController");
const authController = require("../../controller/authController");

router
  .route("/")
  .get(popStatsController.getAll)
  .post(authController.authentication, popStatsController.insert);
router.route("/:region").get(popStatsController.getDetails);
router
  .route("/:id")
  .patch(authController.authentication, popStatsController.UpdateDetail)
  .delete(authController.authentication, popStatsController.deleteDetail);

module.exports = router;
