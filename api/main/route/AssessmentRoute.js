import express from "express";
import { verifySuperVisor } from "../../utils/VerifyToken.js";
import { authenticate } from "../middleware/auth.js";
import { AssessmentController } from "../controller/AssessmentController.js";
const controller = new AssessmentController();

import upload from "../middleware/fileUpload.js";
const router = express.Router();

router.post(
  "/upload",
  upload.single("file"),
  verifySuperVisor,
  controller.upload.bind(controller)
);

export default router;
