import { SubmissionService } from "../service/SubmissionService.js";
const submissionService = new SubmissionService();

export class SubmissionController {
  async submit(req, res, next) {
    try {
      if (!req.file || !req.body.data) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Both file and data are required.",
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
        assessmentId: parsed.assessmentId,
        studentId: req.id,
        fileUrl: `/uploads/assessments/${req.file.filename}`,
      };

      const response = await submissionService.submitAssessment(payload);

      res.status(201).json({
        status: 201,
        success: true,
        message: "Assessment submitted successfully.",
      });
    } catch (err) {
      next(err);
    }
  }

  async review(req, res, next) {
    try {
      const submissionId = req.body.submissionId;

      const payload = {
        grade: req.body.grade,
        feedback: req.body.feedback,
      };

      const response = await submissionService.reviewSubmission(
        submissionId,
        payload
      );

      res.status(200).json({
        status: 200,
        success: true,
        message: "Submission reviewed successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async getStudentSubmissions(req, res, next) {
    try {
      const studentId = req.id;
      const response = await submissionService.getSubmissionsByStudent(
        studentId
      );

      res.status(200).json({
        status: 200,
        success: true,
        message: "Submitted assessments fetched successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async list(req, res, next) {
    try {
      const supervisorId = req.id;

      const response = await submissionService.getSubmissionsBySupervisor(
        supervisorId
      );

      res.status(200).json({
        status: 200,
        success: true,
        message: "Submission list fetched successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
}
