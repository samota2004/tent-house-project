const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.log("❌ SMTP ERROR:", err);
  } else {
    console.log("✅ SMTP READY");
  }
});

const sendMail = async ({ to, subject, text, html }) => {
  return await transporter.sendMail({
    from: `"Pragati Tent House" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
};

module.exports = { sendMail };