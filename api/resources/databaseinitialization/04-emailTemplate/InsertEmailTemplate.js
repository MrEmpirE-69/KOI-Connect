import EmailTemplate from "../../../main/model/EmailTemplate.js";
import { v4 as uuidv4 } from "uuid";

const createEmailTemplate = async () => {
  const uuid2 = uuidv4();
  await EmailTemplate.findOrCreate({
    where: { name: "STUDENT_REGISTRATION_CONFIRMATION" },
    defaults: {
      name: "STUDENT_REGISTRATION_CONFIRMATION",
      subject: "Welcome to KOI-Connect",
      messageText: `Hello {name},\n\nYour KOI student account has been created.\n\nPlease login to our website using following credentials:\n\nEmail: {email}\nPassword: {password}\n\nBest regards,\n`,
      messageHtml: `Hello <b>{name},</b><br><br>
        Your KOI student account has been created. Please login to our website using following credentials:<br><br>
        <b>Email: </b>{email} <br>
       <b>Password: </b>{password}<br><br>
       Best regards, <br>
       KOI-Connect`,
      uuid: uuid2,
    },
  });

  const uuid4 = uuidv4();
  await EmailTemplate.findOrCreate({
    where: { name: "ADMIN_REGISTRATION_CONFIRMATION" },
    defaults: {
      name: "ADMIN_REGISTRATION_CONFIRMATION",
      subject: "Welcome to KOI-Connect",
      messageText: `Hello {name},\n\nYour KOI admin account has been created.\n\nPlease login to our web app using following credentials:\n\nEmail: {email}\nPassword: {password}\n\nBest regards,\n`,
      messageHtml: `Hello <b>{name},</b><br><br>
        Your KOI admin account has been created. Please login to our web app (<a href="https://koi.connect.edu.au">here</a>) using following credentials:<br><br>
        <b>Email: </b>{email} <br>
       <b>Password: </b>{password}<br><br>
       Best regards, <br>
       KOI-Connect`,
      uuid: uuid4,
    },
  });
  const uuid5 = uuidv4();
  await EmailTemplate.findOrCreate({
    where: { name: "SUPERVISOR_REGISTRATION_CONFIRMATION" },
    defaults: {
      name: "SUPERVISOR_REGISTRATION_CONFIRMATION",
      subject: "Welcome to KOI-Connect",
      messageText: `Hello {name},\n\nYour KOI supervisor account has been created.\n\nPlease login to our web app  using following credentials:\n\nEmail: {email}\nPassword: {password}\n\nBest regards,\n`,
      messageHtml: `Hello <b>{name},</b><br><br>
        Your KOI supervisor account has been created. Please login to our web app (<a href="https://koi.connect.edu.au">here</a>) using following credentials:<br><br>
        <b>Email: </b>{email} <br>
       <b>Password: </b>{password}<br><br>
       Best regards, <br>
       KOI-Connect`,
      uuid: uuid5,
    },
  });

  const uuid6 = uuidv4();
  await EmailTemplate.findOrCreate({
    where: { name: "ADMIN_RESET_PASSWORD" },
    defaults: {
      name: "ADMIN_RESET_PASSWORD",
      subject: "Password reset request",
      messageText: `Hello {name},\n\nYour KOI admin account password reset request was received.\n\nPlease use the following password to log in to your account.\n\nPassword: {password}\n\nBest regards,\n `,
      messageHtml: `Hello <b>{name},</b><br><br>
        Your KOI admin account password reset request was received. Please use the following password to log in to your account:<br><br>
       <b>Password: </b>{password}<br><br>
       Best regards, <br>
        KOI-Connect`,
      uuid: uuid6,
    },
  });

  const uuidClient = uuidv4();
  await EmailTemplate.findOrCreate({
    where: { name: "CLIENT_REGISTRATION_CONFIRMATION" },
    defaults: {
      name: "CLIENT_REGISTRATION_CONFIRMATION",
      subject: "Welcome to KOI-Connect",
      messageText: `Hello {name},\n\nYour KOI-Connect client account has been successfully created.\n\nYou can log in to your account using the following credentials:\n\nEmail: {email}\nPassword: {password}\n\nIf you have any questions, feel free to contact our support team.\n\nBest regards,\nKOI-Connect Team`,
      messageHtml: `Hello <b>{name},</b><br><br>
      Your KOI-Connect client account has been successfully created.<br><br>
      You can log in to your account using the following credentials:<br><br>
      <b>Email: </b>{email} <br>
      <b>Password: </b>{password}<br><br>
      If you have any questions, feel free to contact our support team.<br><br>
      Best regards, <br>
      KOI-Connect Team`,
      uuid: uuidClient,
    },
  });
};
export default createEmailTemplate;
