import EmailTemplate from "../../../main/emailtemplate/model/EmailTemplate.js";
import { v4 as uuidv4 } from "uuid";

const createEmailTemplate = async () => {
  const uuid1 = uuidv4();
  await EmailTemplate.findOrCreate({
    where: { name: "FACULTY_REGISTRATION_CONFIRMATION" },
    defaults: {
      name: "FACULTY_REGISTRATION_CONFIRMATION",
      subject: "Welcome to KCMIT faculty",
      messageText: `Hello {name},\n\nYour KCMIT faculty account has been created.\n\nPlease login to our mobile app (https://kcmit.edu.np/kcmitapp/) using following credentials:\n\nEmail: {email}\nPassword: {password}\n\nBest regards,\n Kantipur College of Management and Information Technology`,
      messageHtml: `Hello <b>{name},</b><br><br>
        Your KCMIT faculty account has been created. Please login to our mobile app (<a href="https://kcmit.edu.np/kcmitapp/">Download app</a>) using following credentials:<br><br>
        <b>Email: </b>{email} <br>
       <b>Password: </b>{password}<br><br>
       Best regards, <br>
       Kantipur College of Management and Information Technology`,
      uuid: uuid1,
    },
  });
  const uuid2 = uuidv4();
  await EmailTemplate.findOrCreate({
    where: { name: "STUDENT_REGISTRATION_CONFIRMATION" },
    defaults: {
      name: "STUDENT_REGISTRATION_CONFIRMATION",
      subject: "Welcome to KCMIT",
      messageText: `Hello {name},\n\nYour KCMIT student account has been created.\n\nPlease login to our mobile app using following credentials:\n\nEmail: {email}\nPassword: {password}\n\nBest regards,\n Kantipur College of Management and Information Technology`,
      messageHtml: `Hello <b>{name},</b><br><br>
        Your KCMIT student account has been created. Please login to our mobile app using following credentials:<br><br>
        <b>Email: </b>{email} <br>
       <b>Password: </b>{password}<br><br>
       Best regards, <br>
       Kantipur College of Management and Information Technology`,
      uuid: uuid2,
    },
  });
  const uuid3 = uuidv4();
  await EmailTemplate.findOrCreate({
    where: { name: "PARENT_REGISTRATION_CONFIRMATION" },
    defaults: {
      name: "PARENT_REGISTRATION_CONFIRMATION",
      subject: "Welcome to KCMIT",
      messageText: `Hello {name},\n\nYour KCMIT parent account has been created.\n\nPlease login to our mobile app using following credentials:\n\nEmail: {email}\nPassword: {password}\n\nBest regards,\n Kantipur College of Management and Information Technology`,
      messageHtml: `Hello <b>{name},</b><br><br>
        Your KCMIT parent account has been created. Please login to our mobile app using following credentials:<br><br>
        <b>Email: </b>{email} <br>
       <b>Password: </b>{password}<br><br>
       Best regards, <br>
       Kantipur College of Management and Information Technology`,
      uuid: uuid3,
    },
  });
  const uuid4 = uuidv4();
  await EmailTemplate.findOrCreate({
    where: { name: "ADMIN_REGISTRATION_CONFIRMATION" },
    defaults: {
      name: "ADMIN_REGISTRATION_CONFIRMATION",
      subject: "Welcome to KCMIT",
      messageText: `Hello {name},\n\nYour KCMIT admin account has been created.\n\nPlease login to our web app (https://app.kcmit.edu.np) using following credentials:\n\nEmail: {email}\nPassword: {password}\n\nBest regards,\n Kantipur College of Management and Information Technology`,
      messageHtml: `Hello <b>{name},</b><br><br>
        Your KCMIT admin account has been created. Please login to our web app (<a href="https://app.kcmit.edu.np">here</a>) using following credentials:<br><br>
        <b>Email: </b>{email} <br>
       <b>Password: </b>{password}<br><br>
       Best regards, <br>
       Kantipur College of Management and Information Technology`,
      uuid: uuid4,
    },
  });
  const uuid5 = uuidv4();
  await EmailTemplate.findOrCreate({
    where: { name: "FACULTY_RESET_PASSWORD" },
    defaults: {
      name: "FACULTY_RESET_PASSWORD",
      subject: "Password reset request",
      messageText: `Hello {name},\n\nYour KCMIT faculty account password reset request was received.\n\nPlease use the following password to log in to your account.\n\nPassword: {password}\n\nBest regards,\n Kantipur College of Management and Information Technology`,
      messageHtml: `Hello <b>{name},</b><br><br>
        Your KCMIT faculty account password reset request was received. Please use the following password to log in to your account:<br><br>
       <b>Password: </b>{password}<br><br>
       Best regards, <br>
       Kantipur College of Management and Information Technology`,
      uuid: uuid5,
    },
  });
  const uuid6 = uuidv4();
  await EmailTemplate.findOrCreate({
    where: { name: "ADMIN_RESET_PASSWORD" },
    defaults: {
      name: "ADMIN_RESET_PASSWORD",
      subject: "Password reset request",
      messageText: `Hello {name},\n\nYour KCMIT admin account password reset request was received.\n\nPlease use the following password to log in to your account.\n\nPassword: {password}\n\nBest regards,\n Kantipur College of Management and Information Technology`,
      messageHtml: `Hello <b>{name},</b><br><br>
        Your KCMIT admin account password reset request was received. Please use the following password to log in to your account:<br><br>
       <b>Password: </b>{password}<br><br>
       Best regards, <br>
       Kantipur College of Management and Information Technology`,
      uuid: uuid6,
    },
  });
};
export default createEmailTemplate;
