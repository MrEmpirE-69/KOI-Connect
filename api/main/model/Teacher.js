import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";

const Teacher = sequelize.define(
  "Teacher",
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

    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    specialization: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    qualification: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    designation: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "PENDING", "BLOCKED", "DELETED"),
      allowNull: false,
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
    tableName: "teachers",
  }
);

export default Teacher;
