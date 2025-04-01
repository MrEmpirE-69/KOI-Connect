import sequelize from "./connection.js";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Connected to database ${process.env.DB_NAME} at ${process.env.DB_HOST}`
    );
    await sequelize.sync({ alter: true });
    console.log("Database synced and tables created.");
  } catch (error) {
    console.error("Error connecting to the database", error);
    throw error;
  }
};

export { sequelize, dbConnection };
