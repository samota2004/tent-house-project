const express = require("express");
const router = express.Router();

// same transporter jo contact me hai
const transporter = require("../utils/mailer");

// POST /api/booking
router.post("/", async (req, res) => {
  try {
    const { service, date, name, phone, email, details } = req.body;

    if (!service || !date || !name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Missing fields (service, date, name, phone are required)",
      });
    }

    const info = await transporter.sendMail({
      from: `"Pragati Tent House" <${process.env.MAIL_USER}>`, // ✅ consistent
      to: process.env.OWNER_EMAIL,
      subject: "📅 New Booking Request",
      replyTo: email || process.env.MAIL_USER, // ✅ so owner can reply directly
      text: `New Booking Request
Service: ${service}
Date: ${date}
Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
Details: ${details || "No details"}
`,
      html: `
        <h2>📅 New Booking</h2>
        <p><b>Service:</b> ${service}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email || "Not provided"}</p>
        <p><b>Details:</b> ${details || "No details"}</p>
        <hr/>
        <p>Pragati Tent House Website</p>
      `,
    });

    return res.json({
      success: true,
      message: "Booking sent successfully",
      messageId: info.messageId,
    });
  } catch (err) {
    console.error("❌ Booking mail error:", err);

    return res.status(500).json({
      success: false,
      message: "Mail failed",
      error: err?.message || "Unknown error",
    });
  }
});

module.exports = router;