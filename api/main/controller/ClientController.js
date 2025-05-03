import { ClientService } from "../service/ClientService.js";
const clientService = new ClientService();

export class ClientController {
  async create(req, res, next) {
    try {
      const client = await clientService.createClient(req.body);

      res.status(200).json({
        status: 200,
        success: true,
        message: "Client created successfully.",
      });
    } catch (err) {
      next(err);
    }
  }

  async getActiveClientCount(req, res, next) {
    try {
      const response = await clientService.getActiveClientCount();
      res.status(200).json({
        status: 200,
        success: true,
        message: "Client count retrieved successfully.",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async getActive(req, res, next) {
    try {
      const response = await clientService.getAllActive();

      res.status(200).json({
        status: 200,
        success: true,
        message: "Client list retrieved successfully.",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteClient(req, res, next) {
    try {
      const { uuid } = req.body;
      await clientService.deleteClient(uuid);
      res.status(200).json({
        status: 200,
        success: true,
        message: "Client deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const { uuid, ...data } = req.body;
      const response = await clientService.update(uuid, data);

      res.status(200).json({
        status: 200,
        success: true,
        message: "Client updated successfully.",
      });
    } catch (err) {
      next(err);
    }
  }

  async viewProfile(req, res, next) {
    try {
      const userId = req.id;
      const userProfile = await clientService.viewProfile(userId);
      res.status(200).json({
        success: true,
        status: 200,
        message: "Client profile retrieved successfully",
        data: userProfile,
      });
    } catch (error) {
      next(error);
    }
  }
  async changePassword(req, res, next) {
    const passwordData = req.body;
    try {
      await clientService.changePassword(req.id, passwordData);
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
