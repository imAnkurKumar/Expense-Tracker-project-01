const express = require("express");

const router = express.Router();
const reportController = require("../controller/report");
const userAuthentication = require("../middleware/auth");

router.get("/getReportPage", reportController.getReportPage);

router.post("/dailyReports", userAuthentication, reportController.dailyReports);

router.post(
  "/weeklyReports",
  userAuthentication,
  reportController.weeklyReports
);

router.post(
  "/monthlyReports",
  userAuthentication,
  reportController.monthlyReports
);

router.post(
  "/yearlyReports",
  userAuthentication,
  reportController.yearlyReports
);

module.exports = router;
