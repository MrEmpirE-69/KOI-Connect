import { Op } from "sequelize";
import Assessment from "../model/Assessment.js";

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
