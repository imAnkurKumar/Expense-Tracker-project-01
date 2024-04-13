const express = require("express");
const router = express.Router();

const resetPasswordController = require("../controller/resetPassword");

router.post("/forgotpassword", resetPasswordController.sendEmail);

module.exports = router;
