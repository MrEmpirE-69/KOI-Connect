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
      where: { status: "ACTIVE" },
      attributes: { exclude: ["id"] },
    });
  }

  async updateSupervisor(uuid, data) {
    const supervisor = await Supervisor.findOne({ where: { uuid } });
    if (!supervisor) throw createError(404, "Supervisor not found.");

    return await supervisor.update(data);
  }
}
