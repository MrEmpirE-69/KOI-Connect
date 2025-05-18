import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { dbConnection } from "./database.js";
import AuthRoute from "./main/auth/route/AuthRoute.js";
import UserRoute from "./main/usermanager/route/UserRoute.js";
import User from "./main/usermanager/model/User.js";
import Student from "./main/model/Student.js";
import Project from "./main/model/Project.js";
import Client from "./main/model/Client.js";
import StudentProjectMap from "./main/model/StudentProjectMap.js";
import Supervisor from "./main/model/Supervisor.js";
import "./main/model/associations.js";
import swaggerUi from "swagger-ui-express";
import Message from "./main/model/Message.js";
import swaggerJsdoc from "swagger-jsdoc";
import ProjectSubmission from "./main/model/ProjectSubmission.js";
import SuperVisorRoute from "./main/route/SupervisorRoute.js";
import StudentRoute from "./main/route/StudentRoute.js";
import ClientRoute from "./main/route/ClientRoute.js";
import swaggerDocs from "./swagger.js";
import AssessmentRoute from "./main/route/AssessmentRoute.js";
import SubmissionRoute from "./main/route/SubmissionRoute.js";
import ProjectRoute from "./main/route/ProjectRoute.js";
import { setupSocketServer } from "./chatSocketBackend.js";
import ChatRoute from "./main/route/ChatRoute.js";
import ContactRoute from "./main/route/ContactRoute.js";
dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/api", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/supervisor", SuperVisorRoute);
app.use("/api/student", StudentRoute);
app.use("/api/client", ClientRoute);
app.use("/api/assessment", AssessmentRoute);
app.use("/api/assessmentSubmit", SubmissionRoute);
app.use("/api/project", ProjectRoute);
app.use("/api/chat", ChatRoute);
app.use("/api/contact", ContactRoute);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Welcome to KOI-Connect Server.");
});

setupSocketServer(server);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Internal server error!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

server.listen(process.env.PORT, async () => {
  await dbConnection();
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

swaggerDocs(app, `${process.env.PORT}`);
