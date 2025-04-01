import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api", AuthRoute);
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
