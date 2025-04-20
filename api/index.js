import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database.js";
import AuthRoute from "./main/auth/route/AuthRoute.js";
import UserRoute from "./main/usermanager/route/UserRoute.js";
import User from "./main/usermanager/model/User.js";
import Student from "./main/model/Student.js";
import Project from "./main/model/Project.js";
import Client from "./main/model/Client.js";
import StudentProjectMap from "./main/model/StudentProjectMap.js";
import Teacher from "./main/model/Teacher.js";
import Supervisor from "./main/model/Supervisor.js";
import "./main/model/associations.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api", AuthRoute);
app.use("/api/user", UserRoute);
app.get("/", (req, res) => {
  res.send("Welcome to KOI-Connect Server.");
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Internal server error!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

app.listen(process.env.PORT, async () => {
  await dbConnection();
  console.log(`Server running on port ${process.env.PORT}`);
});
