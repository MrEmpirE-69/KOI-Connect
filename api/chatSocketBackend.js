// chatSocketBackend.js
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "./main/model/Message.js";

export function setupSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication error"));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      socket.user = decoded;
      next();
    } catch (err) {
      return next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    console.log("🟢 New socket connection:", socket.user);

    socket.on("send_message", async (data) => {
      const msg = await Message.create({
        senderId: socket.user.id,
        senderRole: socket.user.role,
        receiverId: data.receiverId,
        receiverRole: data.receiverRole,
        content: data.content,
        timestamp: new Date(),
        isRead: false,
      });

      socket.broadcast.emit("receive_message", msg);
    });

    socket.on("disconnect", () => {
      console.log("🔌 Socket disconnected:", socket.user);
    });
  });
}
