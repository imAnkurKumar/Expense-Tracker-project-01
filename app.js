const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const userRouter = require("./router/user");
const expenseRouter = require("./router/expense");

const sequelize = require("./util/database");
const User = require("./model/user");
const Expense = require("./model/expense");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use("/", userRouter);
app.use("/user", userRouter);

app.use("/", expenseRouter);
app.use("/expense", expenseRouter);
User.hasMany(Expense);
Expense.belongsTo(User);
sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));
