import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../usermanager/model/User.js";

export class AuthService {
  async authenticate(req, res, next) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        return next(createError(404, "User doesnot exist."));
      }
      if (!user.isVerified || user.status === "PENDING") {
        return next(
          createError(403, "Please verify your account to continue.")
        );
      }
      if (user.status === "BLOCKED") {
        return next(
          createError(
            403,
            "Your account is blocked. Please contact administration."
          )
        );
      }
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        return next(createError(401, "The password is incorrect."));
      }
      const token = jwt.sign(
        {
          id: user.id,
          role: "ADMIN",
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );
      res.status(200).json({
        success: true,
        status: 200,
        message: "Successfully Signed In.",
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}
