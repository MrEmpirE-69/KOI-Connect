import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";

const Submission = sequelize.define(
  "Submission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    assessmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "assessment_id",
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

    submittedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    status: {
      type: DataTypes.ENUM("PENDING", "REVIEWED", "DELETED"),
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
    tableName: "submissions",
  }
);

export default Submission;
