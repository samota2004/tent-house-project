const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
console.log("RESEND KEY:", process.env.RESEND_API_KEY);
const sendMail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: "Pragati Tent House <onboarding@resend.dev>",  // ⚠️ ye hi rakho
      to,
      subject,
      html,
    });

    console.log("EMAIL RESPONSE:", data);
    return data;

  } catch (error) {
    console.error("RESEND ERROR:", error);
    throw error;
  }
};

module.exports = { sendMail };