const nodemailer = require("nodemailer");
require("dotenv").config();
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  const email = await transporter.sendMail({
    to,
    from: process.env.USER_EMAIL,
    subject,
    html,
  });
  console.log(`Email sent!`);
};

module.exports = sendEmail;
