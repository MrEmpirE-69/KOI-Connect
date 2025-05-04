import Assessment from "../model/Assessment";

export class AssessmentService {
  async uploadAssessment(payload) {
    try {
      const assessment = await Assessment.create({
        title: payload.title,
        description: payload.description,
        fileUrl: payload.fileUrl,
        deadline: payload.deadline,
        supervisorId: payload.supervisorId,
      });
      return assessment;
    } catch (error) {
      throw error;
    }
  }
}
