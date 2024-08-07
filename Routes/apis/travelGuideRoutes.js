const express = require("express");
const router = express.Router();
const travelGuideController = require("./../../controller/apis/travelGuideController");
const authController = require("../../controller/authController");

router
  .route("/")
  .get(travelGuideController.getAll)
  .post(authController.authentication, travelGuideController.insert);
router.route("/:destination").get(travelGuideController.getDetails);
router
  .route("/:id")
  .patch(authController.authentication, travelGuideController.UpdateDetail)
  .delete(authController.authentication, travelGuideController.deleteDetail);

module.exports = router;
