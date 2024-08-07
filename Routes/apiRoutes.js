const express = require("express");
const router = express.Router();
const apiController = require("../controller/apiController");
const authController = require("../controller/authController");

router.route("/").get(apiController.getAllApi);
// router.route("/:name").get(apiController.getApi);
router
  .route("/:id")
  .get(apiController.getApi)
  .patch(authController.authentication, apiController.updateApi)
  .delete(authController.authentication, apiController.deleteApi);

module.exports = router;
