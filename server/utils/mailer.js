const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("MAIL ERROR ❌:", error);
  } else {
    console.log("MAIL READY ✅");
  }
});

module.exports = transporter;