import { Op } from "sequelize";
import Assessment from "../model/Assessment.js";
import Student from "../model/Student.js";
import Submission from "../model/Submission.js";

export class SubmissionService {
  async submitAssessment(payload) {
    try {
      const { assessmentId, studentId, fileUrl } = payload;

      if (!assessmentId || !studentId || !fileUrl) {
        throw new Error("All fields are required");
      }

      const assessment = await Assessment.findByPk(assessmentId);
      if (!assessment) {
        throw new Error("Assessment not found.");
      }
      if (assessment.status === "CLOSED") {
        throw new Error(
          "This assessment is closed. Please contact your supervisor."
        );
      }

      const submission = await Submission.create({
        assessmentId,
        studentId,
        fileUrl,
      });

      return submission;
    } catch (error) {
      throw error;
    }
  }

  async reviewSubmission(submissionId, payload) {
    try {
      const submission = await Submission.findByPk(submissionId);
      if (!submission) {
        throw new Error("Submission not found.");
      }

      submission.grade = payload.grade;
      submission.feedback = payload.feedback;
      submission.status = "REVIEWED";

      await submission.save();
      return submission;
    } catch (error) {
      throw error;
    }
  }

  async getSubmissionsByStudent(studentId) {
    try {
      const submissions = await Submission.findAll({
        where: { studentId },
        where: {
          status: {
            [Op.in]: ["PENDING", "REVIEWED"],
          },
        },
        include: [
          {
            model: Assessment,
            as: "assessment",
            attributes: ["id", "title", "deadline", "status"],
          },
        ],
        order: [["submittedAt", "DESC"]],
      });

      return submissions;
    } catch (error) {
      throw error;
    }
  }

  async getSubmissionsBySupervisor(supervisorId) {
    try {
      const submissions = await Submission.findAll({
        where: {
          status: {
            [Op.in]: ["PENDING", "REVIEWED"],
          },
        },
        include: [
          {
            model: Assessment,
            as: "assessment",
            required: true,
            where: { supervisorId },
          },
          {
            model: Student,
            as: "student",
            attributes: ["id", "fullName", "email"],
          },
        ],
        order: [["submittedAt", "DESC"]],
      });

      return submissions;
    } catch (error) {
      throw error;
    }
  }
}
