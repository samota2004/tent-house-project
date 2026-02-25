const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendMail({ to, subject, text, html }) {
  return resend.emails.send({
    from: "Pragati Tent House <onboarding@resend.dev>", // working default
    to,
    subject,
    text,
    html,
  });
}

module.exports = { sendMail };