const express = require("express");
const router = express.Router();

const userController = require("../controller/user");
router.use(express.static("public"));

router.get("/", userController.getSignUpPage);

router.post("signUp", (req, res, next) => {
  res.redirect("/");
});

module.exports = router;
