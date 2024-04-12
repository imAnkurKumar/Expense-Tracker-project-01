const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const userRouter = require("./router/user");
const expenseRouter = require("./router/expense");
const purchaseRouter = require("./router/purchaseMembership");

const sequelize = require("./util/database");
const User = require("./model/user");
const Expense = require("./model/expense");
const Order = require("./model/order");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use("/", userRouter);
app.use("/user", userRouter);

app.use("/", expenseRouter);
app.use("/expense", expenseRouter);
app.use("/purchase", purchaseRouter);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));
