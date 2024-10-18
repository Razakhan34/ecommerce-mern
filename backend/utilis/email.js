const nodemailer = require("nodemailer");

const sendEmail = async ({ subject, message, email }) => {
  const trasporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOption = {
    from: `Ecommerce <${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject,
    text: message,
  };
  await trasporter.sendMail(mailOption);
};

module.exports = sendEmail;
