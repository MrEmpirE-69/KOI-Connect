import express from "express";
import { ChatController } from "../controller/ChatController.js";
import { authenticate } from "../middleware/auth.js";
import Client from "../model/Client.js";
import Supervisor from "../model/Supervisor.js";
import Student from "../model/Student.js";
import { Op } from "sequelize";

const router = express.Router();
const controller = new ChatController();

router.post("/send", authenticate, controller.send.bind(controller));
router.post("/history", authenticate, controller.history.bind(controller));

router.get("/users", authenticate, async (req, res) => {
  try {
    const { roles, id } = req;
    let users = [];

    const students = await Student.findAll({
      where: roles === "STUDENT" ? { id: { [Op.ne]: id } } : {},
      attributes: ["id", "fullName"],
    });

    const supervisors = await Supervisor.findAll({
      where: roles === "SUPERVISOR" ? { id: { [Op.ne]: id } } : {},
      attributes: ["id", "fullName"],
    });

    const clients = await Client.findAll({
      where: roles === "CLIENT" ? { id: { [Op.ne]: id } } : {},
      attributes: ["id", "fullName"],
    });

    users = [
      ...students.map((s) => ({
        id: s.id,
        role: "STUDENT",
        title: s.fullName,
      })),
      ...supervisors.map((s) => ({
        id: s.id,
        role: "SUPERVISOR",
        title: s.fullName,
      })),
      ...clients.map((c) => ({
        id: c.id,
        role: "CLIENT",
        title: c.fullName,
      })),
    ];

    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch chat users." });
  }
});

export default router;
