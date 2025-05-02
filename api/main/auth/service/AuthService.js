import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../usermanager/model/User.js";
import Supervisor from "../../model/Supervisor.js";
import Student from "../../model/Student.js";
import { createError } from "../../../utils/Error.js";

export class AuthService {
  async authenticateUser(req, res, next) {
    try {
      const { email, password } = req.body;

      let user = null;
      let role = null;
      let userType = null;

      user = await User.findOne({ where: { email } });
      if (user) {
        role = "ADMIN";
        userType = "User"; // Sequelize model
      }

      // If not Admin, try finding Supervisor
      if (!user) {
        user = await Supervisor.findOne({ where: { email } });
        if (user) {
          role = "SUPERVISOR";
          userType = "Supervisor";
        }
      }

      // If not Supervisor, try finding Student
      if (!user) {
        user = await Student.findOne({ where: { email } });
        if (user) {
          role = "STUDENT";
          userType = "Student";
        }
      }

      if (!user) {
        return next(createError(404, "User does not exist."));
      }

      //  Status and verification checks
      if (user.status === "BLOCKED") {
        return next(
          createError(
            403,
            "Your account is blocked. Please contact administration."
          )
        );
      }

      if (user.status === "DELETED") {
        return next(createError(403, "Your account has been deleted."));
      }

      //  Verify password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return next(createError(401, "The password is incorrect."));
      }
      //Create token
      const token = jwt.sign(
        {
          id: user.id,
          role: role,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );

      //  Update last login, isVerified true, status ACTIVE for Supervisor/Student
      if (userType === "Supervisor" || userType === "Student") {
        await user.update({
          lastLoginTime: new Date(),
          status: "ACTIVE",
          isVerified: true,
        });
      }

      res.status(200).json({
        success: true,
        status: 200,
        message: `Successfully logged in as ${role}`,
        token,
        role,
      });
    } catch (error) {
      next(error);
    }
  }
}
