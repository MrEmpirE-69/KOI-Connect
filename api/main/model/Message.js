import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";

const Message = sequelize.define(
  "Message",
  {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    senderRole: {
      type: DataTypes.ENUM("ADMIN", "SUPERVISOR", "STUDENT", "CLIENT"),
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    receiverRole: {
      type: DataTypes.ENUM("ADMIN", "SUPERVISOR", "STUDENT", "CLIENT"),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "messages",
  }
);

export default Message;
