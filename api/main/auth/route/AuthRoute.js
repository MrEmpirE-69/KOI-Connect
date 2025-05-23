import express from "express";
import { authenticate } from "../controller/AuthController.js";

const router = express.Router();

router.post("/authenticate", authenticate);

export default router;
