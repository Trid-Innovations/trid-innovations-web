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
    signature = `${signature}<br><br><img src="https://travelwithziggy.com/wp-content/uploads/2022/10/T.W.Z-logotype-1-150x150-1.png"/>`;
    html = `${html}<br><br><br>  ${signature}`;
    const mailOptions = {
      from: `"TRID" <${CONTACT_EMAIL}>`,
      to: CONTACT_EMAIL,
      sender: CONTACT_EMAIL_AUTH,
      replyTo: CONTACT_EMAIL_AUTH,
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
