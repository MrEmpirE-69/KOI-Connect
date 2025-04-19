import sequelize from "./connection.js";
import dotenv from "dotenv";
import createSuperAdmin from "./resources/databaseinitialization/02-user/InsertUser.js";
import createEmailTemplate from "./resources/databaseinitialization/04-emailTemplate/InsertEmailTemplate.js";
dotenv.config();

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Connected to database ${process.env.DB_NAME} at ${process.env.DB_HOST}`
    );
    await sequelize.sync({ drop: false });
    await createSuperAdmin();
    await createEmailTemplate();
    console.log("Database synced and tables created.");
  } catch (error) {
    console.error("Error connecting to the database", error);
    throw error;
  }
};

export { sequelize, dbConnection };
