const { Resend } = require("resend");

if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY missing in .env");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async ({ to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: "Pragati Tent House <onboarding@resend.dev>", 
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    console.log("✅ Email sent:", response);

    return response;
  } catch (error) {
    console.error("❌ Resend error:", error);
    throw error;
  }
};

module.exports = { sendMail };