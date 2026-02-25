console.log("BODY RECEIVED:", req.body);
const express = require("express");
const router = express.Router();
const { sendMail } = require("../utils/mailer");
console.log("Contact API Hit");
router.post("/", async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await sendMail({
      to: process.env.OWNER_EMAIL,
      subject: "📩 New Contact Message",
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.log("❌ MAIL ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;