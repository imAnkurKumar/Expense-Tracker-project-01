const path = require("path");
const Expense = require("../model/expense");
const User = require("../model/user");
const sequelize = require("../util/database");

exports.getHomePage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "public", "views", "homePage.html"));
};

exports.getAllExpenses = async (req, res) => {
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
  const t = await sequelize.transaction();

  try {
    const { amount, description, category } = req.body;
    const result = await Expense.create(
      {
        amount: amount,
        description: description,
        category: category,
        userId: req.user.id,
      },
      { transaction: t }
    );
    const totalExpense = Number(req.user.totalExpenses) + Number(amount);
    console.log("totalExpense", totalExpense);
    console.log("result", result);
    const updateUser = await User.update(
      { totalExpenses: totalExpense },
      { where: { id: req.user.id }, transaction: t }
    );
    await t.commit();
    res
      .status(200)
      .json({ message: "Expense added successfully", expense: result });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const expenseId = req.params.id;
    const expense = await Expense.findOne({
      where: { id: expenseId, userId: req.user.id }, // Check both ID and userId
    });
    if (!expense) {
      t.rollback();
      return res.status(404).json({ message: "Expense not found" });
    }
    const deletedAmount = expense.amount;
    await expense.destroy({ transaction: t }); // Delete the expense
    const updateUser = await User.update(
      {
        totalExpenses: Number(req.user.totalExpenses) - Number(deletedAmount),
      },
      {
        where: {
          id: req.user.id,
        },
        transaction: t,
      }
    );

    await t.commit();
    res.status(200).json({ message: "Expense has been deleted" });
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
