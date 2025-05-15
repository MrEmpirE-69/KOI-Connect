import express from "express";
import { verifyStudent, verifySuperVisor } from "../../utils/VerifyToken.js";
import { authenticate } from "../middleware/auth.js";
import { AssessmentController } from "../controller/AssessmentController.js";
const controller = new AssessmentController();

import upload from "../middleware/fileUpload.js";
const router = express.Router();

router.post(
  "/upload",
  upload.single("file"),
  authenticate,
  verifySuperVisor,
  controller.upload.bind(controller)
);

router.get(
  "/list",
  authenticate,
  verifySuperVisor,
  controller.list.bind(controller)
);

router.get(
  "/listAll",
  authenticate,
  verifyStudent,
  controller.listAll.bind(controller)
);

router.post(
  "/edit",
  authenticate,
  verifySuperVisor,
  controller.edit.bind(controller)
);

router.post(
  "/delete",
  authenticate,
  verifySuperVisor,
  controller.delete.bind(controller)
);

export default router;
