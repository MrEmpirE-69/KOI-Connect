import { AssessmentService } from "../service/AssessmentService.js";
const assessmentService = new AssessmentService();
export class AssessmentController {
  async upload(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "File is required.",
        });
      }

      let parsed;
      try {
        parsed = JSON.parse(req.body.data);
      } catch (e) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Invalid JSON in 'data' field.",
        });
      }

      const payload = {
        title: parsed.title,
        description: parsed.description,
        deadline: parsed.deadline,
        fileUrl: `/uploads/assessments/${req.file.filename}`,
        supervisorId: req.id,
      };

      const response = await assessmentService.uploadAssessment(payload);

      res.status(201).json({
        status: 201,
        success: true,
        message: "Assessment uploaded successfully.",
      });
    } catch (err) {
      next(err);
    }
  }

  async list(req, res, next) {
    try {
      const supervisorId = req.id;
      const response = await assessmentService.getAssessmentsBySupervisor(
        supervisorId
      );

      res.status(200).json({
        status: 200,
        success: true,
        message: "Assessments fetched successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async listAll(req, res, next) {
    try {
      const response = await assessmentService.listAll();

      res.status(200).json({
        status: 200,
        success: true,
        message: "Assessments fetched successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
  async edit(req, res, next) {
    try {
      const assessmentId = req.body.assessmentId;
      const supervisorId = req.id;

      const updates = {
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        status: req.body.status,
      };

      const response = await assessmentService.editAssessment(
        assessmentId,
        supervisorId,
        updates
      );

      res.status(200).json({
        status: 200,
        success: true,
        message: "Assessment updated successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const assessmentId = req.body.assessmentId;
      const supervisorId = req.id;

      if (!assessmentId || typeof assessmentId !== "number") {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Invalid assessment ID.",
        });
      }

      const response = await assessmentService.deleteAssessment(
        assessmentId,
        supervisorId
      );

      res.status(200).json({
        status: 200,
        success: true,
        message: "Assessment deleted successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
}
