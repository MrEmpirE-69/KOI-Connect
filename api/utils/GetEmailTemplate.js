import EmailTemplate from "../main/model/EmailTemplate.js";
import { createError } from "./Error.js";

async function getEmailTemplate(templateName, placeholders) {
  try {
    const template = await EmailTemplate.findOne({
      where: { name: templateName },
    });

    if (!template) {
      throw createError(404, "No template found");
    }
    let { subject, messageText, messageHtml } = template;

    for (let key in placeholders) {
      const placeholder = `{${key}}`;
      subject = subject.replace(
        new RegExp(placeholder, "g"),
        placeholders[key]
      );
      messageText = messageText.replace(
        new RegExp(placeholder, "g"),
        placeholders[key]
      );
      messageHtml = messageHtml.replace(
        new RegExp(placeholder, "g"),
        placeholders[key]
      );
    }
    return { subject, text: messageText, html: messageHtml };
  } catch (error) {
    throw error;
  }
}

export default getEmailTemplate;
