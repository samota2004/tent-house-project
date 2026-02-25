const express = require("express");
const router = express.Router();
const { sendMail } = require("../utils/mailer");

router.post("/", async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await sendMail({
      to: process.env.OWNER_EMAIL,
      subject: "📩 New Contact Message",
      text: `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("❌ Contact mail error:", error);
    res.status(500).json({ message: "Mail not sent", error: error.message });
  }
});

module.exports = router;