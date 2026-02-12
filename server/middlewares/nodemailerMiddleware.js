const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendTestEmail = async () => {
  try {
    console.log("Trying to send email via SendGrid API...");
    console.log("API KEY EXISTS:", !!process.env.SENDGRID_API_KEY);

    const msg = {
      to: "pizzaapp.notifications@gmail.com",
      from: "pizzaapp.notifications@gmail.com", // verified sender
      subject: "Test Email from Render (SendGrid API)",
      text: "If you receive this, SendGrid API works!",
    };

    const response = await sgMail.send(msg);

    console.log("Email sent successfully:", response[0].statusCode);
  } catch (error) {
    console.error("Email failed:", error.response?.body || error);
  }
};

module.exports = sendTestEmail;
