/* eslint no-use-before-define: 0 */
import { envs } from "../utils/config";

import functions = require("firebase-functions");
import nodemailer = require("nodemailer");

exports.sendEmail = functions.https.onCall(async (data: ContactInput) => {
  const { CONTACT_EMAIL_AUTH, CONTACT_EMAIL, CONTACT_JAAFU_AUTH_TRID } = envs;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: CONTACT_EMAIL_AUTH,
      pass: CONTACT_JAAFU_AUTH_TRID,
    },
  });
  const { email, name, number, message } = data;
  let html = `from :${email}<br> Name: ${name} `;
  if (number) {
    html = `${html}<br> Phone number: ${number}`;
  }
  html = `${html}<br> Message: ${message}`;
  const mailOptions = {
    from: `"From" <${CONTACT_EMAIL}>`,
    to: CONTACT_EMAIL,
    sender: CONTACT_EMAIL_AUTH,
    replyTo: CONTACT_EMAIL_AUTH,
    subject: "Contact from TRID Website",
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Failed to send email", error);
    return { success: false, message: "Failed to send email" };
  }
});

type ContactInput = {
  name: string;
  email: string;
  number: string;
  message: string;
};
