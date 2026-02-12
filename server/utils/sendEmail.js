const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: process.env.SENDER_EMAIL,
    subject,
    text,
    html,
  };

  try {
    const response = await sgMail.send(msg);
    console.log("Email sent:", response[0].statusCode);
  } catch (error) {
    console.error("Email error:", error.response?.body || error.message);
  }
};

module.exports = sendEmail;
