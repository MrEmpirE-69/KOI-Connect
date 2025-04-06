import express from "express";
import { UserController } from "../controller/UserController.js";
import { verifyAdmin, verifyToken } from "../../../utils/VerifyToken.js";
import { authenticate } from "../../middleware/auth.js";

const router = express.Router();

const userController = new UserController();

router.post(
  "/create",
  verifyAdmin,
  userController.createUser.bind(userController)
);
router.post(
  "/resendMail",
  verifyAdmin,
  userController.resendRegistrationMail.bind(userController)
);
router.post(
  "/resetPassword",
  verifyAdmin,
  userController.resetPassword.bind(userController)
);
router.get("/list", verifyToken, userController.listUsers.bind(userController));
router.post(
  "/update",
  verifyAdmin,
  userController.updateUser.bind(userController)
);
router.post(
  "/block",
  verifyAdmin,
  userController.blockUser.bind(userController)
);
router.post(
  "/unblock",
  verifyAdmin,
  userController.unblockUser.bind(userController)
);
router.get(
  "/profile",
  authenticate,
  userController.viewProfile.bind(userController)
);
router.post(
  "/viewUser",
  authenticate,
  userController.viewUser.bind(userController)
);
router.post(
  "/changePassword",
  authenticate,
  userController.changePassword.bind(userController)
);
export default router;
