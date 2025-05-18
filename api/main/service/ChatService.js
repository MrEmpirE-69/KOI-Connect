import Message from "../model/Message.js";
import { Op } from "sequelize";

export class ChatService {
  async sendMessage(data) {
    const { senderId, senderRole, receiverId, receiverRole, content } = data;
    return await Message.create({
      senderId,
      senderRole,
      receiverId,
      receiverRole,
      content,
      timestamp: new Date(),
      isRead: false,
    });
  }

  async getChatHistory(req, withId, withRole) {
    const id = req.id;
    const role = req.roles;

    return await Message.findAll({
      where: {
        [Op.or]: [
          {
            senderId: id,
            senderRole: role,
            receiverId: withId,
            receiverRole: withRole,
          },
          {
            senderId: withId,
            senderRole: withRole,
            receiverId: id,
            receiverRole: role,
          },
        ],
      },
      order: [["timestamp", "ASC"]],
    });
  }
}
