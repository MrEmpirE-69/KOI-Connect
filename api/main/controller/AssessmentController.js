import { AssessmentService } from "../service/AssessmentService.js";
const assessmentService = new AssessmentService();
export class AssessmentController {
  async upload(req, res, next) {
    try {
      const fileUrl = req.file
        ? `/uploads/assessments/${req.file.filename}`
        : null;

      const payload = {
        title: req.body.title,
        description: req.body.description,
        fileUrl: fileUrl,
        deadline: req.body.deadline,
        supervisorId: req.id,
      };

      const response = await assessmentService.uploadAssessment(payload);

      res.status(201).json({
        status: 201,
        success: true,
        message: "Assessment uploaded successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
}
