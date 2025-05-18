import { v4 as uuidv4 } from "uuid";
import Client from "../model/Client.js";
import Project from "../model/Project.js";
import ProjectSubmission from "../model/ProjectSubmission.js";
import StudentProjectMap from "../model/StudentProjectMap.js";
import Supervisor from "../model/Supervisor.js";
import Student from "../model/Student.js";
import { Op } from "sequelize";

export class ProjectService {
  async createProject(data) {
    const {
      title,
      description,
      category,
      deadline,
      supervisorId,
      clientId,
      studentIds = [],
      fileUrl,
    } = data;

    const project = await Project.create({
      uuid: uuidv4(),
      title,
      description,
      category,
      deadline,
      supervisorId,
      clientId,
      fileUrl,
      status: "PUBLISHED",
    });

    const mapData = studentIds.map((studentId) => ({
      studentId,
      projectId: project.id,
    }));

    await StudentProjectMap.bulkCreate(mapData);
    return project;
  }

  async submitProject({ projectId, studentId, fileUrl }) {
    const existing = await ProjectSubmission.findOne({
      where: { projectId, studentId },
    });
    if (existing) throw new Error("You have already submitted this project.");

    return await ProjectSubmission.create({ projectId, studentId, fileUrl });
  }

  async getAssignedProjects(studentId) {
    const student = await Student.findByPk(studentId, {
      include: [
        {
          model: Project,
          as: "projects",
          where: {
            status: {
              [Op.not]: "DELETED",
            },
          },
          required: false,
          include: [
            {
              model: Supervisor,
              as: "supervisor",
              attributes: ["id", "fullName"],
            },
            {
              model: Client,
              as: "client",
              attributes: ["id", "fullName"],
            },
          ],
        },
      ],
    });
    if (!student) throw new Error("Student not found.");
    return student.projects;
  }

  async getProjectsBySupervisor(supervisorId) {
    return await Project.findAll({
      where: { supervisorId },
      where: {
        status: {
          [Op.in]: [
            "DRAFT",
            "PUBLISHED",
            "IN_PROGRESS",
            "COMPLETED",
            "CANCELLED",
          ],
        },
      },
      include: [
        { model: Client, as: "client", attributes: ["id", "fullName"] },
      ],
    });
  }
  async listAll() {
    return await Project.findAll({
      where: {
        status: {
          [Op.in]: ["PUBLISHED", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
        },
      },
      include: [
        { model: Client, as: "client", attributes: ["id", "fullName"] },
        { model: Supervisor, as: "supervisor", attributes: ["id", "fullName"] },
      ],
    });
  }

  async editProject(projectId, supervisorId, updates) {
    const project = await Project.findOne({
      where: { id: projectId, supervisorId },
    });
    if (!project) throw new Error("Project not found or unauthorized.");
    await project.update(updates);
    return project;
  }

  async deleteProject(projectId, supervisorId) {
    const project = await Project.findOne({
      where: { id: projectId, supervisorId },
    });
    if (!project) throw new Error("Project not found or unauthorized.");
    await project.update({ status: "DELETED" });
    return project;
  }

  async reviewSubmission(submissionId, supervisorId, grade, feedback) {
    const submission = await ProjectSubmission.findOne({
      where: { id: submissionId },
      include: [{ model: Project, as: "project", where: { supervisorId } }],
    });
    if (!submission) throw new Error("Submission not found or unauthorized.");

    submission.grade = grade;
    submission.feedback = feedback;
    submission.status = "REVIEWED";
    await submission.save();
    return submission;
  }

  async getAllSubmissionsBySupervisor(supervisorId) {
    return await ProjectSubmission.findAll({
      include: [
        {
          model: Project,
          as: "project",
          where: { supervisorId },
          where: {
            status: {
              [Op.in]: [
                "DRAFT",
                "PUBLISHED",
                "IN_PROGRESS",
                "COMPLETED",
                "CANCELLED",
              ],
            },
          },
          attributes: ["id", "title"],
          include: [
            { model: Client, as: "client", attributes: ["id", "fullName"] },
          ],
        },
        {
          model: Student,
          as: "student",
          attributes: ["id", "fullName", "email", "studentId"],
        },
      ],
    });
  }

  async getSubmissionsByStudent(studentId) {
    return await ProjectSubmission.findAll({
      where: { studentId },
      include: [
        {
          model: Project,
          as: "project",
          where: {
            status: {
              [Op.in]: [
                "DRAFT",
                "PUBLISHED",
                "IN_PROGRESS",
                "COMPLETED",
                "CANCELLED",
              ],
            },
          },
          required: false,
          include: [
            {
              model: Supervisor,
              as: "supervisor",
              attributes: ["id", "fullName"],
            },
            {
              model: Client,
              as: "client",
              attributes: ["id", "fullName"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async assignStudentsToProject(projectId, studentIds) {
    const project = await Project.findByPk(projectId);
    if (!project) throw new Error("Project not found.");

    const mappings = studentIds.map((studentId) => ({ studentId, projectId }));
    await StudentProjectMap.bulkCreate(mappings, { ignoreDuplicates: true });

    return { projectId, assigned: studentIds.length };
  }
}
