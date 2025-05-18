import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const chatRequest = axios.create({
  baseURL: BASE_URL + "/chat",
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  },
});

export const fetchChatHistory = async ({ withId, withRole }) => {
  const res = await chatRequest.post(`/history`, {
    withId,
    withRole,
  });
  return res.data.data;
};

export const sendMessage = async ({ receiverId, receiverRole, content }) => {
  const res = await chatRequest.post("/send", {
    receiverId,
    receiverRole,
    content,
  });
  return res.data.data;
};

export const fetchChatUsers = async () => {
  const res = await chatRequest.get("/users");
  return res.data.data;
};
