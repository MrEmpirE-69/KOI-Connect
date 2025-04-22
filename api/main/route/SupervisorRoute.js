import express from "express"; // External module
import { SupervisorController } from "../controller/SupervisorController.js"; // Controller
import { verifySupervisor } from "../../../utils/VerifyToken.js"; // Utility for token verification
import { authenticate } from "../../middleware/auth.js"; // Middleware for authentication

const router = express.Router();

const supervisorController = new SupervisorController();

// Supervisor routes
router.get("/list", verifySupervisor, supervisorController.listUsers.bind(supervisorController)); // List users
router.get("/profile/:uuid", authenticate, supervisorController.viewUserProfile.bind(supervisorController)); // View a user's profile
router.post("/update", verifySupervisor, supervisorController.updateUser.bind(supervisorController)); // Update user

export default router;
