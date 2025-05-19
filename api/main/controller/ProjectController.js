import { ProjectService } from "../service/ProjectService.js";
const projectService = new ProjectService();

export class ProjectController {
  async create(req, res, next) {
    try {
      if (!req.file || !req.body.data) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "File and data are required.",
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
        category: parsed.category,
        deadline: parsed.deadline,
        clientId: parsed.clientId,
        studentIds: parsed.studentIds || [],
        supervisorId: req.id,
        fileUrl: `/uploads/assessments/${req.file.filename}`,
      };

      const response = await projectService.createProject(payload);
      res.status(201).json({
        status: 201,
        success: true,
        message: "Project created successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async submit(req, res, next) {
    try {
      if (!req.file || !req.body.data) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "File and data are required.",
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
        projectId: parsed.projectId,
        studentId: req.id,
        fileUrl: `/uploads/assessments/${req.file.filename}`,
      };

      const response = await projectService.submitProject(payload);
      res.status(201).json({
        status: 201,
        success: true,
        message: "Project submitted successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async assignedList(req, res, next) {
    try {
      const response = await projectService.getAssignedProjects(req.id);
      res.status(200).json({
        status: 200,
        success: true,
        message: "Assigned projects fetched successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
  async assignedListClient(req, res, next) {
    try {
      const response = await projectService.getAssignedProjectsForClient(
        req.id
      );
      res.status(200).json({
        status: 200,
        success: true,
        message: "Assigned projects fetched successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async list(req, res, next) {
    try {
      const response = await projectService.getProjectsBySupervisor(req.id);
      res.status(200).json({
        status: 200,
        success: true,
        message: "Projects fetched successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
  async listAll(req, res, next) {
    try {
      const response = await projectService.listAll();
      res.status(200).json({
        status: 200,
        success: true,
        message: "All projects fetched successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async edit(req, res, next) {
    try {
      const { projectId, title, description, deadline, category, status } =
        req.body;
      const response = await projectService.editProject(projectId, req.id, {
        title,
        description,
        deadline,
        category,
        status,
      });
      res.status(200).json({
        status: 200,
        success: true,
        message: "Project updated successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { projectId } = req.body;
      const response = await projectService.deleteProject(projectId, req.id);
      res.status(200).json({
        status: 200,
        success: true,
        message: "Project deleted successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async review(req, res, next) {
    try {
      const { submissionId, grade, feedback } = req.body;
      const response = await projectService.reviewSubmission(
        submissionId,
        req.id,
        grade,
        feedback
      );
      res.status(200).json({
        status: 200,
        success: true,
        message: "Review submitted successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async listAllSubmissions(req, res, next) {
    try {
      const response = await projectService.getAllSubmissionsBySupervisor(
        req.id
      );
      res.status(200).json({
        status: 200,
        success: true,
        message: "All student submissions fetched successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async submissionListByStudent(req, res, next) {
    try {
      const response = await projectService.getSubmissionsByStudent(req.id);
      res.status(200).json({
        status: 200,
        success: true,
        message: "Submissions fetched successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async assign(req, res, next) {
    try {
      const { projectId, studentIds } = req.body;

      if (!projectId || !Array.isArray(studentIds) || studentIds.length === 0) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Project ID and student IDs are required.",
        });
      }

      const response = await projectService.assignStudentsToProject(
        projectId,
        studentIds
      );

      res.status(200).json({
        status: 200,
        success: true,
        message: "Project assigned successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
}
