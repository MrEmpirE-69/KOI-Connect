import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";

const Project = sequelize.define(
  "Project",
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

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        "DRAFT",
        "PUBLISHED",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED"
      ),
      defaultValue: "DRAFT",
    },

    supervisorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "supervisor_id",
    },

    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "student_id",
    },
  },
  {
    timestamps: true,
    tableName: "projects",
  }
);

export default Project;
