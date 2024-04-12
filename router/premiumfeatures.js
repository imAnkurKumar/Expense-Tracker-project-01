const express = require("express");
const premiumFeaturesController = require("../controller/premiumfeatures");
const userAuthentication = require("../middleware/auth");
const router = express.Router();

router.get(
  "/showLeaderboard",
  userAuthentication,
  premiumFeaturesController.getUserLeaderboard
);
module.exports = router;
