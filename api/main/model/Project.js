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
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "client_id",
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

    fileUrl: {
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
        "CANCELLED",
        "DELETED"
      ),
      defaultValue: "DRAFT",
    },

    supervisorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "supervisor_id",
    },
  },
  {
    timestamps: true,
    tableName: "projects",
  }
);

export default Project;
