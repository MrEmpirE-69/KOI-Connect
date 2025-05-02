import express from "express";
import { SupervisorController } from "../controller/SupervisorController.js";
import { verifyAdmin } from "../../utils/VerifyToken.js";

const router = express.Router();
const controller = new SupervisorController();

router.post("/create", verifyAdmin, controller.create.bind(controller));
router.get("/list", controller.getActive.bind(controller));
router.get("/count", controller.getActiveUserCount.bind(controller));
router.post("/delete", controller.deletUser.bind(controller));
router.post("/edit", verifyAdmin, controller.edit.bind(controller));

export default router;
