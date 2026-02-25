const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",   // ✅ Gmail SMTP
  port: 587,                // ✅ Important
  secure: false,            // false for 587

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // Gmail App Password
  },

  tls: {
    rejectUnauthorized: false, // Render compatibility
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// ✅ Check connection
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ MAIL ERROR:", error.message);
  } else {
    console.log("✅ MAIL SERVER READY");
  }
});

module.exports = transporter;