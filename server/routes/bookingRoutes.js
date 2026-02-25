const express = require("express");
const router = express.Router();

// same transporter jo contact me hai
const transporter = require("../utils/mailer");

// POST /api/booking
router.post("/", async (req, res) => {
  try {

    const {
      service,
      date,
      name,
      phone,
      email,
      details,
    } = req.body;

    if (!service || !date || !name || !phone) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.OWNER_EMAIL, // owner ko
      subject: "📅 New Booking Request",

      html: `
        <h2>New Booking</h2>

        <p><b>Service:</b> ${service}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email || "Not provided"}</p>
        <p><b>Details:</b> ${details || "No details"}</p>

        <hr/>
        <p>Pragati Tent House Website</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Booking sent sucessfully",
    });

  } catch (err) {

    console.log("Booking mail error:", err);

    res.status(500).json({
      success: false,
      message: "Mail failed",
    });
  }
});

module.exports = router;