import { SupervisorService } from "../service/SupervisorService.js";
const supervisorService = new SupervisorService();

export class SupervisorController {
  async create(req, res, next) {
    try {
      const supervisor = await supervisorService.createSupervisor(req.body);

      res.status(200).json({
        status: 200,
        success: true,
        message: "supervisor created successfully.",
      });
    } catch (err) {
      next(err);
    }
  }
  async getActiveUserCount(req, res, next) {
    try {
      const response = await supervisorService.getActiveUserCount();
      res.status(200).json({
        status: 200,
        success: true,
        message: "Supervisor count retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  async getActive(req, res, next) {
    try {
      const response = await supervisorService.getActiveSupervisors();

      res.status(200).json({
        status: 200,
        success: true,
        message: "Active supervisor list retrieved successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async deletUser(req, res, next) {
    try {
      const { uuid } = req.body;
      await supervisorService.deleteUser(uuid);
      res.status(200).json({
        status: 200,
        success: true,
        message: "Supervisor deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const { uuid, ...data } = req.body;
      const response = await supervisorService.updateSupervisor(uuid, data);

      res.status(200).json({
        status: 200,
        success: true,
        message: "Supervisor updated successfully.",
      });
    } catch (err) {
      next(err);
    }
  }
  async viewProfile(req, res, next) {
    try {
      const userId = req.id;
      const userProfile = await supervisorService.viewProfile(userId);
      res.status(200).json({
        success: true,
        status: 200,
        message: "Supervisor profile retrieved successfully",
        data: userProfile,
      });
    } catch (error) {
      next(error);
    }
  }
  async changePassword(req, res, next) {
    const passwordData = req.body;
    try {
      await supervisorService.changePassword(req.id, passwordData);
      res.status(200).json({
        status: 200,
        success: true,
        message: "Password changed successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}
