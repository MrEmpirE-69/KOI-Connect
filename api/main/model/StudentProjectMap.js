import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";

const StudentProjectMap = sequelize.define(
  "StudentProjectMap",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      field: "student_id",
    },
    projectId: {
      type: DataTypes.INTEGER,
      field: "project_id",
    },
    assignedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "student_project_map",
  }
);

export default StudentProjectMap;
