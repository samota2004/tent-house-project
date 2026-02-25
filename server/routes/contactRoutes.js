const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// 📧 Nodemailer transporter
const transporter = require("../utils/mailer");

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("📩 Contact Message:", { name, phone, message });

    // ✅ ACTUAL MAIL SEND
    const info = await transporter.sendMail({
      from: `"Royal Tent House" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,   // owner email
      subject: "📩 New Contact Message",
      text: `
Name: ${name}
Phone: ${phone}
Message: ${message}
      `,
    });

    console.log("✅ Mail sent successfully:", info.messageId);

    res.status(200).json({ message: "Message sent to owner successfully" });
  } catch (error) {
    console.error("❌ Mail sending error:", error);
    res.status(500).json({ message: "Mail not sent", error: error.message });
  }
});

module.exports = router;