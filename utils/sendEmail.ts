import nodemailer from "nodemailer";
import Imap from "imap";
import { simpleParser } from "mailparser";

export type mailSenderPayload = {
  senderEmail: string;
  senderPassword: string;
  recipientEmail: string;
  subject: string;
  body: string;
};

// SMTP (sending) server details
const smtpServer: string = "smtp.titan.email";
const smtpPort: number = 587;

// IMAP (receiving) server details
const imapServer: string = "imap.titan.email";
const imapPort: number = 993;

async function sendEmailAndAppend({
  senderEmail,
  senderPassword,
  recipientEmail,
  subject,
  body,
}: mailSenderPayload): Promise<void> {
  try {
    // Create a nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: smtpServer,
      port: smtpPort,
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    // Create the email options
    const mailOptions = {
      from: senderEmail,
      to: recipientEmail,
      subject: subject,
      text: body,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
    console.log("Info object:", info);

    // Append the sent email to the "Sent" folder using IMAP
    const imap = new Imap({
      user: senderEmail,
      password: senderPassword,
      host: imapServer,
      port: imapPort,
      tls: true,
    });

    imap.once("ready", () => {
      imap.openBox("Sent", true, (err) => {
        if (err) {
          console.error('Error opening "Sent" folder:', err);
          imap.end();
          return;
        }

        // Create the email message as MIMEText
        const emailMessage = `From: ${senderEmail}\r\nTo: ${recipientEmail}\r\nSubject: ${subject}\r\n\r\n${body}`;

        // Append the sent email to the "Sent" folder
        imap.append(emailMessage, { mailbox: "Sent" }, (appendErr) => {
          if (appendErr) {
            console.error('Error appending email to "Sent" folder:', appendErr);
          } else {
            console.log('Email appended to "Sent" folder.');
          }
          imap.end();
        });
      });
    });

    imap.once("error", (imapErr: Error) => {
      console.error("IMAP Error:", imapErr);
    });

    imap.connect();
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
