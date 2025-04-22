export class SupervisorService {
  async createSupervisor(requestBody) {}
}
import User from "../model/User.js"; // Model for interacting with user data
import { createError } from "../../../utils/Error.js"; // Custom error utility

export class SupervisorService {
  // View a list of users (not all details, excluding sensitive info)
  async listUsers() {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password", "id", "isVerified", "isSuperAdmin"] },
        order: [["createdAt", "DESC"]],
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  // View profile of a specific user (supervisors may view)
  async viewUserProfile(uuid) {
    try {
      const user = await User.findOne({
        where: { uuid },
        attributes: { exclude: ["password", "isVerified", "createdAt", "updatedAt"] },
      });
      if (!user) {
        throw createError(404, "User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Update user information (supervisor can update non-sensitive fields)
  async updateUser(uuid, userData) {
    try {
      const { fullName, mobileNumber, address, email } = userData;
      const requiredFields = ["fullName", "address", "mobileNumber", "email"];
      const missingFields = requiredFields.filter((field) => !userData[field]);
      if (missingFields.length > 0) {
        throw createError(400, `Missing required fields: ${missingFields.join(", ")}`);
      }

      const user = await User.findOne({ where: { uuid } });

      if (!user) {
        throw createError(404, "User not found");
      }

      // Update only permissible fields
      const updatedUser = await user.update({
        fullName,
        mobileNumber,
        address,
        email,
      });

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}
