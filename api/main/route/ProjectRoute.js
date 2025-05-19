import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  verifyClient,
  verifyStudent,
  verifySuperVisor,
} from "../../utils/VerifyToken.js";
import upload from "../middleware/fileUpload.js";
import { ProjectController } from "../controller/ProjectController.js";

const router = express.Router();
const controller = new ProjectController();

router.post(
  "/create",
  upload.single("file"),
  authenticate,
  verifySuperVisor,
  controller.create.bind(controller)
);

router.post(
  "/submit",
  upload.single("file"),
  authenticate,
  verifyStudent,
  controller.submit.bind(controller)
);

router.get(
  "/assigned",
  authenticate,
  verifyStudent,
  controller.assignedList.bind(controller)
);
router.get(
  "/assigned/client",
  authenticate,
  verifyClient,
  controller.assignedListClient.bind(controller)
);

router.get(
  "/list",
  authenticate,
  verifySuperVisor,
  controller.list.bind(controller)
);
router.get("/listAll", authenticate, controller.listAll.bind(controller));

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

router.post(
  "/review",
  authenticate,
  verifySuperVisor,
  controller.review.bind(controller)
);

router.get(
  "/submissions",
  authenticate,
  verifySuperVisor,
  controller.listAllSubmissions.bind(controller)
);

router.post(
  "/assign",
  authenticate,
  verifySuperVisor,
  controller.assign.bind(controller)
);
router.get(
  "/mySubmissions",
  authenticate,
  verifyStudent,
  controller.submissionListByStudent.bind(controller)
);

export default router;
