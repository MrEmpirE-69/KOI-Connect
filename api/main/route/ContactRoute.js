import express from "express";
import ContactController from "../controller/ContactController.js";
import { authenticate } from "../../main/middleware/auth.js";

const router = express.Router();

router.post("/submit", ContactController.submitContact);
router.get("/list", authenticate, ContactController.listContacts);
router.post("/reply", authenticate, ContactController.replyToContact);

export default router;
