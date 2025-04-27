import { AuthService } from "../service/AuthService.js";
const authService = new AuthService();

export const authenticate = async (req, res, next) => {
  return authService.authenticateUser(req, res, next);
};
