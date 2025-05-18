import { Op } from "sequelize";
import Contact from "../model/Contact.js";
import { v4 as uuidv4 } from "uuid";

const ContactController = {
  async submitContact(req, res, next) {
    try {
      const { fullName, email, subject, message } = req.body;
      const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      if (!fullName || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          message:
            "All fields (fullName, email, subject, message) are required",
        });
      }

      const recentContact = await Contact.findOne({
        where: {
          [Op.or]: [
            {
              email,
              subject,
              createdAt: {
                [Op.gt]: new Date(Date.now() - 24 * 60 * 60 * 1000),
              },
            },
            {
              ipAddress,
              createdAt: {
                [Op.gt]: new Date(Date.now() - 24 * 60 * 60 * 1000),
              },
            },
          ],
        },
      });

      if (recentContact) {
        return res.status(429).json({
          success: false,
          message:
            "You have already submitted a contact request today. Please try again tomorrow.",
        });
      }

      const contact = await Contact.create({
        uuid: uuidv4(),
        fullName,
        email,
        subject,
        message,
        ipAddress,
      });

      res.status(201).json({
        success: true,
        message: "Contact submitted successfully",
        data: contact,
      });
    } catch (err) {
      next(err);
    }
  },
  async listContacts(req, res, next) {
    try {
      if (req.roles !== "ADMIN") {
        return res
          .status(403)
          .json({ success: false, message: "Only admin can view contacts" });
      }

      const contacts = await Contact.findAll({
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({ success: true, data: contacts });
    } catch (err) {
      next(err);
    }
  },

  async replyToContact(req, res, next) {
    try {
      if (req.roles !== "ADMIN") {
        return res
          .status(403)
          .json({ success: false, message: "Only admin can reply" });
      }

      const { contactId, reply } = req.body;
      const contact = await Contact.findByPk(contactId);

      if (!contact)
        return res
          .status(404)
          .json({ success: false, message: "Contact not found" });

      contact.adminReply = reply;
      contact.status = "RESPONDED";
      await contact.save();

      res
        .status(200)
        .json({ success: true, message: "Reply sent", data: contact });
    } catch (err) {
      next(err);
    }
  },
};

export default ContactController;
