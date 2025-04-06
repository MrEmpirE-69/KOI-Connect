import { UserService } from "../service/UserService.js";
const userService = new UserService();

export class UserController {
  async createUser(req, res, next) {
    try {
      const userData = req.body;
      const newUser = await userService.createUser(userData);

      res.status(201).json({
        status: 200,
        success: true,
        message: "User created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async resendRegistrationMail(req, res, next) {
    try {
      const { uuid } = req.body;
      await userService.resendRegistrationMail(uuid);
      res.status(201).json({
        status: 200,
        success: true,
        message: "Registration mail sent successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async resetPassword(req, res, next) {
    try {
      const { uuid } = req.body;
      await userService.resetPassword(uuid);
      res.status(201).json({
        status: 200,
        success: true,
        message: "Reset password mail sent successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async listUsers(req, res, next) {
    try {
      const users = await userService.listUsers();
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

  async updateUser(req, res, next) {
    try {
      const { uuid, ...userData } = req.body;

      const updatedUser = await userService.updateUser(uuid, userData);

      res.status(200).json({
        status: 200,
        success: true,
        message: "User updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async blockUser(req, res, next) {
    try {
      const { uuid } = req.body;
      await userService.blockUser(uuid);
      res.status(200).json({
        status: 200,
        success: true,
        message: "User blocked successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
  async unblockUser(req, res, next) {
    try {
      const { uuid } = req.body;
      await userService.unblockUser(uuid);
      res.status(200).json({
        status: 200,
        success: true,
        message: "User unblocked successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  async viewProfile(req, res, next) {
    try {
      const userId = req.id;
      const userProfile = await userService.viewProfile(userId);
      res.status(200).json({
        success: true,
        status: 200,
        message: "User profile retrieved successfully",
        data: userProfile,
      });
    } catch (error) {
      next(error);
    }
  }
  async viewUser(req, res, next) {
    try {
      const { uuid } = req.body;
      const user = await userService.viewUser(uuid);
      res.status(200).json({
        status: 200,
        success: true,
        message: "User retrieved successfully.",
        user: user,
      });
    } catch (error) {
      next(error);
    }
  }
  async changePassword(req, res, next) {
    const passwordData = req.body;
    try {
      await userService.changePassword(req.id, passwordData);
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
