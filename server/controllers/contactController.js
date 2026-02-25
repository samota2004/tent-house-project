import nodemailer from "nodemailer";

export const sendContactMail = async (req, res) => {
  const { name, phone, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,   // tumhari gmail
        pass: process.env.MAIL_PASS,   // app password
      },
    });

    await transporter.sendMail({
      from: `"Pragati Tent House" <${process.env.MAIL_USER}>`,
      to: "tarachandsamota66@gmail.com",
      subject: "New Contact Message",
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Mail not sent" });
  }
};