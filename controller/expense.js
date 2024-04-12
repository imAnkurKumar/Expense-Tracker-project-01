const path = require("path");
const Expense = require("../model/expense");
const User = require("../model/user");

exports.getHomePage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "public", "views", "homePage.html"));
};

exports.getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });
    // console.log(expenses);
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addExpense = async (req, res, next) => {
  const { amount, description, category } = req.body;

  try {
    const result = await Expense.create({
      amount: amount,
      description: description,
      category: category,
      userId: req.user.id,
    });
    const totalExpense = Number(req.user.totalExpenses) + Number(amount);
    console.log(totalExpense);
    console.log(result);

    const updateUser = await User.update(
      { totalExpenses: totalExpense },
      { where: { id: req.user.id } }
    );
    res.status(200).json({ message: "Expense added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

exports.deleteExpense = async (req, res, next) => {
  const expenseId = req.params.id;
  try {
    const expense = await Expense.findOne({
      where: { id: expenseId, userId: req.user.id }, // Check both ID and userId
    });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    await expense.destroy();
    res.status(200).json({ message: "Expense has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
