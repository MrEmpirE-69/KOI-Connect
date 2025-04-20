import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";
import Student from "./Student.js";
import Project from "./Project.js";

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
      references: {
        model: Student,
        key: "id",
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: "id",
      },
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
