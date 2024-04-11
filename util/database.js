const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "expense-tracker-full-stack",
  "root",
  "T#9758@QLPH",
  {
    dialect: "mysql",
    host: "localhost",
  }
);
module.exports = sequelize;
