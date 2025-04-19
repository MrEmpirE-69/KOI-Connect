import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";

const EmailTemplate = sequelize.define(
  "EmailTemplate",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "name",
    },
    subject: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "subject",
    },
    messageText: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "message_text",
    },
    messageHtml: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "message_html",
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    tableName: "email_templates",
  }
);
export default EmailTemplate;
