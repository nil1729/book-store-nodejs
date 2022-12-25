const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_SERVER,
  port: process.env.EMAIL_SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_SMTP_LOGIN,
    pass: process.env.EMAIL_SMTP_PASSWORD
  }
});

module.exports = transporter;
