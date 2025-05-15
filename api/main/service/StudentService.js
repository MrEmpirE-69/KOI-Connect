import Student from "../model/Student.js";
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

export class StudentService {
  async createStudent(data) {
    const uuid = uuidv4();

    const {
      studentId,
      fullName,
      email,
      mobileNumber,
      address,
      dateOfBirth,
      gender,
    } = data;

    try {
      const requiredFields = [
        "studentId",
        "fullName",
        "email",
        "mobileNumber",
        "address",
      ];
      const missingFields = requiredFields.filter((field) => !data[field]);
      if (missingFields.length > 0) {
        throw createError(
          400,
          `Missing required fields: ${missingFields.join(", ")}`
        );
      }

      if (isNaN(studentId)) {
        throw createError(400, "Student ID must be a valid number");
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
      const existingStudentById = await Student.findOne({
        where: { studentId },
      });
      if (existingStudentById) {
        throw createError(409, "Student with this ID already exists");
      }

      const existingStudentByEmail = await Student.findOne({
        where: { email },
      });
      if (existingStudentByEmail) {
        throw createError(409, "Student with this email already exists");
      }

      const existingStudentByMobile = await Student.findOne({
        where: { mobileNumber },
      });
      if (existingStudentByMobile) {
        throw createError(
          409,
          "Student with this mobile number already exists"
        );
      }

      const password = generateRandomPassword(8);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newStudent = await Student.create({
        studentId,
        fullName,
        email,
        mobileNumber,
        address,
        dateOfBirth,
        gender,
        password: hashedPassword,
        uuid,
      });

      const placeholders = {
        name: fullName,
        email,
        password,
      };
      const { subject, text, html } = await getEmailTemplate(
        "STUDENT_REGISTRATION_CONFIRMATION",
        placeholders
      );

      await sendEmail(email, subject, text, html);

      return newStudent;
    } catch (error) {
      throw error;
    }
  }

  async getAllActive() {
    return await Student.findAll({
      where: {
        status: {
          [Op.in]: ["ACTIVE", "PENDING", "SUSPENDED"],
        },
      },
      attributes: { exclude: ["password"] },
    });
  }

  async getActiveUserCount() {
    try {
      const count = await Student.count({
        where: {
          status: {
            [Op.in]: ["ACTIVE", "PENDING", "SUSPENDED"],
          },
        },
      });
      return count;
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(uuid) {
    try {
      const user = await Student.findOne({ where: { uuid } });
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
  async update(uuid, data) {
    const student = await Student.findOne({ where: { uuid } });
    if (!student) throw createError(404, "Student not found.");

    return await student.update(data);
  }

  async viewProfile(userId) {
    try {
      const userProfile = await Student.findOne({
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

      const user = await Student.findOne({ where: { id: id } });
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
