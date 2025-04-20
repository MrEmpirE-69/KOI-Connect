import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";

const Supervisor = sequelize.define(
  "Supervisor",
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

    department: {
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

    profileImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastLoginTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "last_login_time",
    },
  },
  {
    timestamps: true,
    tableName: "supervisors",
  }
);

export default Supervisor;
