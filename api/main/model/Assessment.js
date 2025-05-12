import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";

const Assessment = sequelize.define(
  "Assessment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    fileUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("OPEN", "CLOSED", "DELETED"),
      defaultValue: "OPEN",
    },

    supervisorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "supervisor_id",
    },
  },
  {
    timestamps: true,
    tableName: "assessments",
  }
);

export default Assessment;
