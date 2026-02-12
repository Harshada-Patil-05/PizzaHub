const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, templateOptions }) => {
  try {
    const msg = {
      to,
      from: process.env.SENDER_EMAIL,
      subject,
      html: `
        <div style="font-family: Arial;">
          <h2>${templateOptions.title}</h2>
          <p>${templateOptions.greeting}</p>
          <p>${templateOptions.message}</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error("Email error:", error.response?.body || error.message);
    return false;
  }
};

module.exports = sendEmail;
