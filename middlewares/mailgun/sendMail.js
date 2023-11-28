const dotenv = require("dotenv");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
dotenv.config();

const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: "api", key: API_KEY });

const sendNotification = (senderMail, receiverMail, subject, text) => {
  const messageData = {
    from: senderMail,
    to: receiverMail,
    subject: subject,
    text: text,
  };

  client.messages
    .create(DOMAIN, messageData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { sendNotification };
