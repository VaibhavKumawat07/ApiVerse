const express = require("express");
const router = express.Router();
const fitFlexController = require("./../../controller/apis/fitFlexController");
const authController = require("../../controller/authController");

router
  .route("/")
  .get(fitFlexController.getAll)
  .post(authController.authentication, fitFlexController.insert);
router.route("/:name").get(fitFlexController.getDetails);
router
  .route("/:id")
  .patch(authController.authentication, fitFlexController.UpdateDetail)
  .delete(authController.authentication, fitFlexController.deleteDetail);

module.exports = router;
