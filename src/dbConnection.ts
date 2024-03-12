import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    dialect: "postgres",
  }
);

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    // Sync all models
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export { sequelize, initializeDatabase };
