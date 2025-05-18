import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export default function useChatSocket({ onReceive }) {
  const socketRef = useRef(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    socketRef.current = io(SOCKET_URL, {
      auth: { token },
    });

    socketRef.current.on("receive_message", (msg) => {
      if (onReceive) onReceive(msg);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (data) => {
    if (socketRef.current) {
      socketRef.current.emit("send_message", data);
    }
  };

  return { sendMessage };
}
