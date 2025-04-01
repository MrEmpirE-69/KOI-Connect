import jwt from "jsonwebtoken";
import { createError } from "./Error.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createError(401, "Please login to proceed."));
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(
        createError(
          403,
          "The provided token is invalid. Please ensure that you have the correct authentication token and try again."
        )
      );
    }
    req.user = user;
    next();
  });
};
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "ADMIN") {
      next();
    } else {
      return next(
        createError(
          403,
          "Access denied: Only admins are authorized to perform this action!"
        )
      );
    }
  });
};
export const verifyStudent = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role.includes("STUDENT")) {
      next();
    } else {
      return next(
        createError(
          403,
          "Access denied: Only students are authorized to perform this action!"
        )
      );
    }
  });
};
export const verifyParent = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "PARENT") {
      next();
    } else {
      return next(
        createError(
          403,
          "Access denied: Only parents are authorized to perform this action!"
        )
      );
    }
  });
};
export const verifyFaculty = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role.includes("FACULTY")) {
      next();
    } else {
      return next(
        createError(
          403,
          "Access denied: Only faculties are authorized to perform this action!"
        )
      );
    }
  });
};
