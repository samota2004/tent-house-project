require("dotenv").config();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

(async () => {
  const data = await resend.emails.send({
    from: "Pragati Tent House <onboarding@resend.dev>",
    to: "yourgmail@gmail.com",
    subject: "Test Mail",
    html: "<h1>Hello</h1>",
  });

  console.log(data);
})();