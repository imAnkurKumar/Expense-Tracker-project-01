const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
dotenv.config();
const PORT = process.env.PORT;
const app = express();
const userRouter = require("./router/user");
const expenseRouter = require("./router/expense");
const purchaseRouter = require("./router/purchaseMembership");
const premiumFeatures = require("./router/premiumfeatures");
const resetPassword = require("./router/resetPassword");
const reportRouter = require("./router/report");

const sequelize = require("./util/database");
const User = require("./model/user");
const Expense = require("./model/expense");
const Order = require("./model/order");
const ResetPassword = require("./model/resetPassword");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "cdnjs.cloudflare.com"],
//       styleSrc: ["'self'", "cdnjs.cloudflare.com"],
//     },
//   })
// );
app.use(cors());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/", userRouter);
app.use("/user", userRouter);
app.use("/", expenseRouter);
app.use("/expense", expenseRouter);
app.use("/purchase", purchaseRouter);
app.use("/premium", premiumFeatures);
app.use("/password", resetPassword);
app.use("/reports", reportRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ResetPassword);
ResetPassword.belongsTo(User);

async function initiate() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      {
        console.log(`Server is running on port ${PORT}`);
      }
    });
  } catch (err) {
    console.log(err);
  }
}
initiate();
