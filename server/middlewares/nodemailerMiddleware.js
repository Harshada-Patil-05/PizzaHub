const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey", // IMPORTANT: must be literally "apikey"
    pass: process.env.SENDGRID_API_KEY,
  },
});

const sendTestEmail = async () => {
  try {
    console.log("Trying to send email via SendGrid...");
    console.log("API KEY EXISTS:", !!process.env.SENDGRID_API_KEY);

    const info = await transporter.sendMail({
      from: "pizzaapp.notifications@gmail.com", // must match verified sender in SendGrid
      to: "pizzaapp.notifications@gmail.com",
      subject: "Test Email from Render (SendGrid)",
      text: "If you receive this, SendGrid works!",
    });

    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Email failed:", error);
  }
};

module.exports = sendTestEmail;
