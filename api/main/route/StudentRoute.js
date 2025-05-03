import express from "express";
import { StudentController } from "../controller/StudentController.js";
import { verifyAdmin } from "../../utils/VerifyToken.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();
const controller = new StudentController();

router.post("/create", verifyAdmin, controller.create.bind(controller));
router.get("/list", controller.getActive.bind(controller));
router.get("/count", controller.getActiveUserCount.bind(controller));
router.post("/delete", controller.deletUser.bind(controller));
router.post("/edit", verifyAdmin, controller.edit.bind(controller));
router.get("/profile", authenticate, controller.viewProfile.bind(controller));
router.post(
  "/changePassword",
  authenticate,
  controller.changePassword.bind(controller)
);

export default router;
