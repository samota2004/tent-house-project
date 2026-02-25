const express = require("express");
const router = express.Router();

// same transporter (SMTP settings) from utils/mailer
const transporter = require("../utils/mailer");

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // ✅ Send mail to owner
    const info = await transporter.sendMail({
      from: `"Pragati Tent House" <${process.env.MAIL_USER}>`, // ✅ FIXED (MAIL_USER)
      to: process.env.OWNER_EMAIL,
      subject: "📩 New Contact Message",
      replyTo: process.env.MAIL_USER, // you can also set replyTo: user email if you collect it
      text: `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`,
      html: `
        <h2>📩 New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
        <hr/>
        <p>Pragati Tent House Website</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent to owner successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("❌ Contact mail sending error:", error);

    return res.status(500).json({
      success: false,
      message: "Mail not sent",
      error: error?.message || "Unknown error",
    });
  }
});

module.exports = router;