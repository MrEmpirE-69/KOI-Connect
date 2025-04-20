import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";

const Client = sequelize.define(
  "Client",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    uuid: {
      type: DataTypes.STRING,
      unique: true,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    profileImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "PENDING", "BLOCKED", "DELETED"),
      defaultValue: "PENDING",
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "clients",
  }
);

export default Client;
