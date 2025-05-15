import Client from "../model/Client.js";
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

export class ClientService {
  async createClient(data) {
    const uuid = uuidv4();

    const { fullName, email, mobileNumber, address } = data;

    try {
      const requiredFields = ["fullName", "email", "mobileNumber"];
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

      // Check for existing records
      const existingClientByEmail = await Client.findOne({
        where: { email },
      });
      if (existingClientByEmail) {
        throw createError(409, "Client with this email already exists");
      }

      const existingClientByMobile = await Client.findOne({
        where: { mobileNumber },
      });
      if (existingClientByMobile) {
        throw createError(409, "Client with this mobile number already exists");
      }

      const password = generateRandomPassword(8);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newClient = await Client.create({
        fullName,
        email,
        mobileNumber,
        address,
        password: hashedPassword,
        uuid,
      });

      const placeholders = {
        name: fullName,
        email,
        password,
      };
      const { subject, text, html } = await getEmailTemplate(
        "CLIENT_REGISTRATION_CONFIRMATION",
        placeholders
      );

      await sendEmail(email, subject, text, html);

      return newClient;
    } catch (error) {
      throw error;
    }
  }

  async getAllActive() {
    return await Client.findAll({
      where: {
        status: {
          [Op.in]: ["ACTIVE", "PENDING", "BLOCKED"],
        },
      },
      attributes: { exclude: ["password"] },
    });
  }

  async getActiveClientCount() {
    try {
      const count = await Client.count({
        where: {
          status: {
            [Op.in]: ["ACTIVE", "PENDING", "BLOCKED"],
          },
        },
      });
      return count;
    } catch (error) {
      throw error;
    }
  }

  async deleteClient(uuid) {
    try {
      const client = await Client.findOne({ where: { uuid } });
      if (!client) {
        throw createError(404, "Client not found.");
      }

      if (client.status === "PENDING") {
        throw createError(400, "Pending client can't be deleted.");
      }
      if (client.status === "DELETED") {
        throw createError(409, "Client is already deleted.");
      }
      await client.update({ status: "DELETED" });
      return client;
    } catch (error) {
      throw error;
    }
  }

  async update(uuid, data) {
    const client = await Client.findOne({ where: { uuid } });
    if (!client) throw createError(404, "Client not found.");

    return await client.update(data);
  }

  async viewProfile(userId) {
    try {
      const userProfile = await Client.findOne({
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

      const user = await Client.findOne({ where: { id: id } });
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
