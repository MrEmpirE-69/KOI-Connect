import Supervisor from "../model/Supervisor.js";
import { v4 as uuidv4 } from "uuid";
import { createError } from "../../utils/Error.js";

export class SupervisorService {
  async createSupervisor(data) {
    const uuid = uuidv4();
    const { fullName, email, mobileNumber, department } = data;

    if (!fullName || !email || !mobileNumber || !department) {
      throw createError(400, "Missing required fields.");
    }

    const existing = await Supervisor.findOne({ where: { email } });
    if (existing)
      throw createError(409, "Supervisor with this email already exists.");

    return await Supervisor.create({
      ...data,
      uuid,
    });
  }

  async getAllSupervisors() {
    return await Supervisor.findAll({
      attributes: { exclude: ["id"] },
      order: [["createdAt", "DESC"]],
    });
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
