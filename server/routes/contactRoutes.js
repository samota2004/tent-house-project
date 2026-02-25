const express = require("express");
const router = express.Router();
const { sendMail } = require("../utils/mailer");

router.post("/", async (req, res) => {
  try {
    const { service, date, name, phone, email, details } = req.body;

    if (!service || !date || !name || !phone) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await sendMail({
      to: process.env.OWNER_EMAIL,
      subject: "📅 New Booking Request",
      text: `Service: ${service}\nDate: ${date}\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nDetails: ${details}`,
      html: `
        <h2>New Booking</h2>
        <p><b>Service:</b> ${service}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email || "Not provided"}</p>
        <p><b>Details:</b> ${details || "No details"}</p>
      `,
    });

    res.json({ success: true, message: "Booking sent successfully" });
  } catch (err) {
    console.log("❌ Booking mail error:", err);
    res.status(500).json({ success: false, message: "Mail failed" });
  }
});

module.exports = router;