import { ChatService } from "../service/ChatService.js";
const chatService = new ChatService();

export class ChatController {
  async send(req, res, next) {
    try {
      const data = {
        senderId: req.user.id,
        senderRole: req.user.role,
        receiverId: req.body.receiverId,
        receiverRole: req.body.receiverRole,
        content: req.body.content,
      };
      const message = await chatService.sendMessage(data);
      res.status(201).json({ success: true, data: message });
    } catch (err) {
      next(err);
    }
  }
  async history(req, res, next) {
    try {
      const { withId, withRole } = req.body;
      const history = await chatService.getChatHistory(req, withId, withRole);
      res.status(200).json({ success: true, data: history });
    } catch (err) {
      next(err);
    }
  }
}
