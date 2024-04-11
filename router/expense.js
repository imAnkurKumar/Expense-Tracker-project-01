const express = require("express");
const router = express.Router();
const expenseController = require("../controller/expense");
const userAuthentication = require("../middleware/auth");
router.use(express.static("public"));

router.get("/", expenseController.getHomePage);
router.post("/addExpenses", userAuthentication, expenseController.addExpense);
router.get(
  "/getAllExpenses",
  userAuthentication,
  expenseController.getAllExpenses
);
router.delete(
  "/deleteExpense/:id",
  userAuthentication,
  expenseController.deleteExpense
);

module.exports = router;
