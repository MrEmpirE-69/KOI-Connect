import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";

const Contact = sequelize.define(
  "Contact",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    uuid: {
      type: DataTypes.STRING,
      unique: true,
    },

    status: {
      type: DataTypes.ENUM("PENDING", "RESPONDED", "CLOSED", "ARCHIVED"),
      defaultValue: "PENDING",
    },
  },
  {
    timestamps: true,
    tableName: "contacts",
  }
);

export default Contact;
