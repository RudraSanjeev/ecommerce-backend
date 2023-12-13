const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;

// Create a transporter using SMTP
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASSWORD,
  },
});

const sendNotification = (senderMail, receiverMail, subject, text) => {
  // setup email data with unicode symbols
  let mailOptions = {
    from: senderMail,
    to: receiverMail,
    subject: subject,
    text: text,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error("Mail not sent !");
    }
  });
};

module.exports = { sendNotification };
