import Supervisor from "../model/Supervisor.js";
import { v4 as uuidv4 } from "uuid";
import { createError } from "../../utils/Error.js";
import bcrypt from "bcrypt";
import sendEmail from "../../utils/SendEmail.js";
import getEmailTemplate from "../../utils/GetEmailTemplate.js";
import validatePhone from "../../utils/ValidatePhone.js";
import validateEmail from "../../utils/ValidateEmail.js";
import validateName from "../../utils/validateName.js";
import generateRandomPassword from "../../utils/GeneratePassword.js";
import { Op } from "sequelize";

export class SupervisorService {
  async createSupervisor(data) {
    const uuid = uuidv4();

    const { fullName, email, mobileNumber, department, designation } = data;

    try {
      const requiredFields = [
        "fullName",
        "email",
        "mobileNumber",
        "department",
        "designation",
      ];
      const missingFields = requiredFields.filter((field) => !data[field]);
      if (missingFields.length > 0) {
        throw createError(
          400,
          `Missing required fields: ${missingFields.join(", ")}`
        );
      }

      const isNameValid = validateName(fullName);
      if (!isNameValid) {
        throw createError(400, "Invalid full name format");
      }

      const isEmailValid = validateEmail(email);
      if (!isEmailValid) {
        throw createError(400, "Invalid email format");
      }

      const isMobileValid = validatePhone(mobileNumber);
      if (!isMobileValid) {
        throw createError(400, "Invalid mobile number format");
      }

      const existingSupervisorByEmail = await Supervisor.findOne({
        where: { email },
      });
      if (existingSupervisorByEmail) {
        throw createError(409, "Supervisor with this email already exists");
      }

      const existingSupervisorByMobile = await Supervisor.findOne({
        where: { mobileNumber },
      });
      if (existingSupervisorByMobile) {
        throw createError(
          409,
          "Supervisor with this mobile number already exists"
        );
      }

      const password = generateRandomPassword(8);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newSupervisor = await Supervisor.create({
        fullName,
        email,
        mobileNumber,
        department,
        designation,
        password: hashedPassword,
        uuid,
      });

      const placeholders = { name: fullName, email, password };
      const { subject, text, html } = await getEmailTemplate(
        "SUPERVISOR_REGISTRATION_CONFIRMATION",
        placeholders
      );

      await sendEmail(email, subject, text, html);

      return newSupervisor;
    } catch (error) {
      throw error;
    }
  }

  async getActiveSupervisors() {
    return await Supervisor.findAll({
      where: {
        status: {
          [Op.in]: ["ACTIVE", "PENDING"],
        },
      },
      attributes: { exclude: ["id", "password"] },
    });
  }
  async getActiveUserCount() {
    try {
      const count = await Supervisor.count({
        status: {
          [Op.in]: ["ACTIVE", "PENDING", "BLOCKED"],
        },
      });
      return count;
    } catch (error) {
      throw error;
    }
  }

  async updateSupervisor(uuid, data) {
    const supervisor = await Supervisor.findOne({ where: { uuid } });
    if (!supervisor) throw createError(404, "Supervisor not found.");

    return await supervisor.update(data);
  }
  async deleteUser(uuid) {
    try {
      const user = await Supervisor.findOne({ where: { uuid } });
      if (!user) {
        throw createError(404, "User not found.");
      }

      if (user.status === "PENDING") {
        throw createError(400, "Pending user can't be deleted.");
      }
      if (user.status === "DELETED") {
        throw createError(409, "User not found.");
      }
      await user.update({ status: "DELETED" });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async viewProfile(userId) {
    try {
      const userProfile = await Supervisor.findOne({
        where: { id: userId },
        attributes: {
          exclude: ["id", "password", "isVerified"],
        },
      });
      if (!userProfile) {
        throw createError(404, "User not found");
      }
      return userProfile;
    } catch (error) {
      throw error;
    }
  }
  async changePassword(id, passwordData) {
    const { oldPassword, newPassword, confirmPassword } = passwordData;

    try {
      if (!oldPassword) {
        throw createError(400, "Old password is required");
      }
      if (!newPassword) {
        throw createError(400, "New password is required");
      }
      if (!confirmPassword) {
        throw createError(400, "Confirm password is required");
      }

      const user = await Supervisor.findOne({ where: { id: id } });
      if (!user) {
        throw createError(404, "User not found");
      }
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        throw createError(401, "Incorrect old password");
      }
      if (newPassword !== confirmPassword) {
        throw createError(
          400,
          "New password and confirm password do not match"
        );
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await user.update({ password: hashedPassword });
    } catch (error) {
      throw error;
    }
  }
}
