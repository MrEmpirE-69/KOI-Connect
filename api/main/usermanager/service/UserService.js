import User from "../model/User.js";
import { createError } from "../../../utils/Error.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import generateRandomPassword from "../../../utils/GeneratePassword.js";
import sendEmail from "../../../utils/SendEmail.js";
import getEmailTemplate from "../../../utils/GetEmailTemplate.js";
import validatePhone from "../../../utils/ValidatePhone.js";
import validateEmail from "../../../utils/ValidateEmail.js";
import validateName from "../../../utils/validateName.js";
import { Op } from "sequelize";

export class UserService {
  async createUser(userData) {
    const uuid = uuidv4();
    try {
      const requiredFields = ["fullName", "email", "mobileNumber", "address"];

      const missingFields = requiredFields.filter((field) => !userData[field]);
      if (missingFields.length > 0) {
        throw createError(
          400,
          `Missing required fields: ${missingFields.join(", ")}`
        );
      }
      const name = userData.fullName;
      const isNameValid = validateName(name);
      if (!isNameValid) {
        throw createError(400, "Invalid name format");
      }

      const existingUserByEmail = await User.findOne({
        where: { email: userData.email },
      });
      if (existingUserByEmail) {
        throw createError(409, "User with this email already exists");
      }
      const existingUserByMobile = await User.findOne({
        where: { mobileNumber: userData.mobileNumber },
      });
      if (existingUserByMobile) {
        throw createError(409, "User with this mobile number already exists");
      }

      const mobileNumber = userData.mobileNumber;
      const validateMobileNumber = validatePhone(mobileNumber);
      if (!validateMobileNumber) {
        throw createError(400, "Invalid mobile number format");
      }

      const email = userData.email;
      const isEmailValid = validateEmail(email);
      if (!isEmailValid) {
        throw createError(400, "Invalid email format");
      }

      const password = generateRandomPassword(8);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({
        ...userData,
        password: hashedPassword,
        uuid: uuid,
        isVerified: true,
        status: "PENDING",
      });
      const placeholders = { name, email, password };
      const { subject, text, html } = await getEmailTemplate(
        "ADMIN_REGISTRATION_CONFIRMATION",
        placeholders
      );
      await sendEmail(email, subject, text, html);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
  async resetPassword(uuid) {
    try {
      const user = await User.findOne({ where: { uuid } });
      if (!user) {
        throw createError(404, "No user found");
      }
      const email = user.email;
      const name = user.fullName;
      const password = generateRandomPassword(8);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const placeholders = { name, password };
      const { subject, text, html } = await getEmailTemplate(
        "ADMIN_RESET_PASSWORD",
        placeholders
      );
      await sendEmail(email, subject, text, html);
      const updatedUser = await user.update({ password: hashedPassword });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
  async resendRegistrationMail(uuid) {
    try {
      const user = await User.findOne({ where: { uuid } });
      if (!user) {
        throw createError(404, "User not found");
      }
      const email = user.email;
      const name = user.fullName;
      const password = generateRandomPassword(8);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const placeholders = { name, email, password };
      const { subject, text, html } = await getEmailTemplate(
        "ADMIN_REGISTRATION_CONFIRMATION",
        placeholders
      );
      await sendEmail(email, subject, text, html);
      const updatedUser = await user.update({ password: hashedPassword });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
  async listUsers() {
    try {
      const users = await User.findAll({
        where: {
          status: {
            [Op.in]: ["ACTIVE", "PENDING"],
          },
        },
        attributes: { exclude: ["password", "id"] },
        order: [["createdAt", "DESC"]],
      });
      return users;
    } catch (error) {
      throw error;
    }
  }
  async getActiveUserCount() {
    try {
      const count = await User.count({
        where: { status: "ACTIVE" },
      });
      return count;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(uuid, userData) {
    try {
      const { password, isVerified, code, ...updatableData } = userData;
      const requiredFields = ["fullName", "address", "mobileNumber", "email"];
      const missingFields = requiredFields.filter((field) => !userData[field]);
      if (missingFields.length > 0) {
        throw createError(
          400,
          `Missing required fields: ${missingFields.join(", ")}`
        );
      }
      const user = await User.findOne({ where: { uuid } });

      if (!user) {
        throw createError(404, "User not found");
      }
      if (user.isSuperAdmin) {
        throw createError(400, "Super Admin can't be updated.");
      }
      const validateMobileNumber = validatePhone(userData.mobileNumber);
      if (!validateMobileNumber) {
        throw createError(400, "Invalid mobile number format");
      }
      const isEmailValid = validateEmail(userData.email);
      if (!isEmailValid) {
        throw createError(400, "Invalid email format");
      }

      if (userData.email && userData.email !== user.email) {
        const existingUserByEmail = await User.findOne({
          where: { email: userData.email },
        });
        if (existingUserByEmail) {
          throw createError(409, "User with this email already exists");
        }
      }

      if (
        userData.mobileNumber &&
        userData.mobileNumber !== user.mobileNumber
      ) {
        const existingUserByMobile = await User.findOne({
          where: { mobileNumber: userData.mobileNumber },
        });
        if (existingUserByMobile) {
          throw createError(409, "User with this mobile number already exists");
        }
      }

      const updatedUser = await user.update(updatableData);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async blockUser(uuid) {
    try {
      const user = await User.findOne({ where: { uuid } });
      if (!user) {
        throw createError(404, "User not found.");
      }
      if (user.isSuperAdmin) {
        throw createError(400, "Super Admin can't be deleted.");
      }
      if (user.status === "PENDING") {
        throw createError(400, "Pending user can't be deleted.");
      }
      if (user.status === "BLOCKED") {
        throw createError(409, "User is already deleted.");
      }
      await user.update({ status: "BLOCKED" });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async unblockUser(uuid) {
    try {
      const user = await User.findOne({ where: { uuid } });
      if (!user) {
        throw createError(404, "User not found.");
      }
      if (user.status === "PENDING") {
        throw createError(400, "Pending user can't be unblocked.");
      }
      if (user.status === "ACTIVE") {
        throw createError(409, "This user is active.");
      }
      await user.update({ status: "ACTIVE" });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async viewProfile(userId) {
    try {
      const userProfile = await User.findOne({
        where: { id: userId },
        attributes: {
          exclude: [
            "id",
            "password",
            "isVerified",
            "uuid",
            "createdAt",
            "updatedAt",
          ],
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
  async viewUser(uuid) {
    try {
      const user = await User.findOne({
        where: { uuid },
        attributes: {
          exclude: ["id", "password", "isVerified", "isSuperAdmin"],
        },
      });
      if (!user) {
        throw createError(404, "User not found.");
      }
      return user;
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

      const user = await User.findOne({ where: { id: id } });
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
