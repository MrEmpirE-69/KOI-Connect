import { SupervisorService } from "../service/SupervisorService.js"; // Service for business logic

const supervisorService = new SupervisorService();

export class SupervisorController {
  // List all users
  async listUsers(req, res, next) {
    try {
      const users = await supervisorService.listUsers();
      res.status(200).json({
        status: 200,
        success: true,
        message: "Users retrieved successfully",
        users: users,
      });
    } catch (error) {
      next(error);
    }
  }

  // View user profile
  async viewUserProfile(req, res, next) {
    try {
      const { uuid } = req.params;
      const userProfile = await supervisorService.viewUserProfile(uuid);
      res.status(200).json({
        status: 200,
        success: true,
        message: "User profile retrieved successfully",
        userProfile,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update user profile (supervisor can update only certain fields)
  async updateUser(req, res, next) {
    try {
      const { uuid, ...userData } = req.body;
      const updatedUser = await supervisorService.updateUser(uuid, userData);
      res.status(200).json({
        status: 200,
        success: true,
        message: "User updated successfully",
        updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
