import { StudentService } from "../service/StudentService.js";
const studentService = new StudentService();

export class StudentController {
  async create(req, res, next) {
    try {
      const student = await studentService.createStudent(req.body);

      res.status(200).json({
        status: 200,
        success: true,
        message: "Student created successfully.",
      });
    } catch (err) {
      next(err);
    }
  }
  async getActiveUserCount(req, res, next) {
    try {
      const response = await studentService.getActiveUserCount();
      res.status(200).json({
        status: 200,
        success: true,
        message: "student count retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  async getActive(req, res, next) {
    try {
      const response = await studentService.getAllActive();

      res.status(200).json({
        status: 200,
        success: true,
        message: "student list retrieved successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async deletUser(req, res, next) {
    try {
      const { uuid } = req.body;
      await studentService.deleteUser(uuid);
      res.status(200).json({
        status: 200,
        success: true,
        message: "Student deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      const { uuid, ...data } = req.body;
      const response = await studentService.update(uuid, data);

      res.status(200).json({
        status: 200,
        success: true,
        message: "Student updated successfully.",
      });
    } catch (err) {
      next(err);
    }
  }
  async viewProfile(req, res, next) {
    try {
      const userId = req.id;
      const userProfile = await studentService.viewProfile(userId);
      res.status(200).json({
        success: true,
        status: 200,
        message: "Student profile retrieved successfully",
        data: userProfile,
      });
    } catch (error) {
      next(error);
    }
  }
  async changePassword(req, res, next) {
    const passwordData = req.body;
    try {
      await studentService.changePassword(req.id, passwordData);
      res.status(200).json({
        status: 200,
        success: true,
        message: "Password changed successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}
