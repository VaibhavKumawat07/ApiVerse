const express = require("express");
const router = express.Router();
const nutriTrackController = require("./../../controller/apis/nutriTrackController");
const authController = require("../../controller/authController");

router
  .route("/")
  .get(nutriTrackController.getAll)
  .post(authController.authentication, nutriTrackController.insert);
router.route("/:name").get(nutriTrackController.getDetails);
router
  .route("/:id")
  .patch(authController.authentication, nutriTrackController.UpdateDetail)
  .delete(authController.authentication, nutriTrackController.deleteDetail);

module.exports = router;
