import jwt from "jsonwebtoken";
import { createError } from "../../utils/Error.js";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(createError(401, "You must login to continue"));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(
        createError(403, "Failed to authenticate with provided credentials")
      );
    }
    req.id = decoded.id;
    req.roles = decoded.role;
    next();
  });
};
