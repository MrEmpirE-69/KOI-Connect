import express from "express";
import { verifyStudent, verifySuperVisor } from "../../utils/VerifyToken.js";
import { authenticate } from "../middleware/auth.js";
import { SubmissionController } from "../controller/SubmissionController.js";
const controller = new SubmissionController();

import upload from "../middleware/fileUpload.js";
const router = express.Router();

router.post(
  "/submit",
  upload.single("file"),
  authenticate,
  verifyStudent,
  controller.submit.bind(controller)
);

router.post("/review", verifySuperVisor, controller.review.bind(controller));

router.get(
  "/listByStudent",
  authenticate,
  verifyStudent,
  controller.getStudentSubmissions.bind(controller)
);

router.get(
  "/list",
  authenticate,
  verifySuperVisor,
  controller.list.bind(controller)
);

export default router;
