import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";

const ProjectSubmission = sequelize.define(
  "ProjectSubmission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "project_id",
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "student_id",
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "REVIEWED"),
      defaultValue: "PENDING",
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "project_submissions",
  }
);

export default ProjectSubmission;
