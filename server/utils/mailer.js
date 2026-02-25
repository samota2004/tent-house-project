const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // 587 => false
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // Gmail App Password (16 chars)
  },
  requireTLS: true,
  tls: {
    servername: "smtp.gmail.com",
  },
});

transporter.verify((error) => {
  if (error) console.log("MAIL ERROR ❌:", error);
  else console.log("MAIL READY ✅");
});

module.exports = transporter;