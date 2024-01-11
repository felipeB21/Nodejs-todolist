const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("collections_db", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
