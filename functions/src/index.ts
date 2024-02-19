/* eslint no-use-before-define: 0 */
import { envs } from "../utils/config";

import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
const cors = require("cors")({ origin: true });
exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
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
    const { email, name, number, message } = req.body;
    let html = `from :${email}<br> Name: ${name} `;
    if (number) {
      html = `${html}<br> Phone number: ${number}`;
    }
    html = `${html}<br> Message: <br> ${message}`;

    let signature = `<br> <a href="www.tridinnovations.com">TRID Innovations Team</a>`;
    signature = `${signature}<br><br><img src="https://www.tridinnovations.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fkxlke1zm%2Fproduction%2F23beb074f2f233ccfa7ae9580fe0547ac73130db-498x188.png&w=1200&q=75"/>`;
    html = `${html}<br><br><br>  ${signature}`;
    const mailOptions = {
      from: `"TRID" <${CONTACT_EMAIL}>`,
      to: CONTACT_EMAIL,
      sender: CONTACT_EMAIL_AUTH,
      replyTo: email,
      subject: "Contact from TRID Website",
      html,
    };

    try {
      await transporter.sendMail(mailOptions);
      res
        .status(200)
        .send({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      console.error("Failed to send email", error);
      res.status(500).send({ success: false, message: "Failed to send email" });
    }
  });
});
