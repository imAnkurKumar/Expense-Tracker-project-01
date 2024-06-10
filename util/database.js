const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "expense-tracker-full-stack",
  "root",
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);
module.exports = sequelize;
