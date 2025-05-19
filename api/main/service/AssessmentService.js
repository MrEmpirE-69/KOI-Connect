import { Op } from "sequelize";
import Assessment from "../model/Assessment.js";
import Submission from "../model/Submission.js";
import Supervisor from "../model/Supervisor.js";

export class AssessmentService {
  async uploadAssessment(payload) {
    try {
      const { title, description, fileUrl, deadline, supervisorId } = payload;

      if (!title) {
        throw new Error("Title is required and must be a string.");
      }

      if (!description) {
        throw new Error("Description is required and must be a string.");
      }

      if (!deadline) {
        throw new Error("Valid deadline is required (YYYY-MM-DD).");
      }

      if (!fileUrl) {
        throw new Error("File upload is required.");
      }

      if (!supervisorId) {
        throw new Error("Supervisor ID is missing or invalid.");
      }
      const assessment = await Assessment.create({
        title: payload.title,
        description: payload.description,
        fileUrl: payload.fileUrl,
        deadline: payload.deadline,
        supervisorId: payload.supervisorId,
        title,
        description,
        fileUrl,
        deadline,
        supervisorId,
      });

      return assessment;
    } catch (error) {
      throw error;
    }
  }
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

      const existingSubmission = await Submission.findOne({
        where: { assessmentId, studentId },
      });

      if (existingSubmission) {
        throw new Error("You have already submitted this assessment.");
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

  async getAssessmentsBySupervisor(supervisorId) {
    try {
      const assessments = await Assessment.findAll({
        where: { supervisorId },
        where: {
          status: {
            [Op.in]: ["OPEN", "CLOSED"],
          },
        },
        order: [["createdAt", "DESC"]],
      });
      return assessments;
    } catch (error) {
      throw error;
    }
  }
  async listAll() {
    try {
      const assessments = await Assessment.findAll({
        where: {
          status: {
            [Op.in]: ["OPEN", "CLOSED"],
          },
        },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Supervisor,
            as: "supervisor",
            attributes: ["id", "fullName"],
          },
        ],
      });
      return assessments;
    } catch (error) {
      throw error;
    }
  }
  async editAssessment(assessmentId, supervisorId, updates) {
    try {
      const assessment = await Assessment.findOne({
        where: { id: assessmentId, supervisorId },
      });

      if (!assessment) {
        throw new Error("Assessment not found or unauthorized.");
      }

      await assessment.update(updates);
      return assessment;
    } catch (error) {
      throw error;
    }
  }

  async deleteAssessment(assessmentId, supervisorId) {
    try {
      const assessment = await Assessment.findOne({
        where: { id: assessmentId, supervisorId },
      });

      if (!assessment) {
        throw new Error("Assessment not found or unauthorized.");
      }

      await assessment.update({ status: "DELETED" });
      return assessment;
    } catch (error) {
      throw error;
    }
  }
}
