const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true only for 465
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify SMTP connection
transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Server is ready to send messages");
  }
});

const sendTestEmail = async () => {
  try {
    console.log("Trying to send email...");
    console.log("EMAIL:", process.env.SENDER_EMAIL);
    console.log("PASSWORD:", process.env.SENDER_PASSWORD);

    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL,
      subject: "Test Email from Render",
      text: "If you receive this, nodemailer works!",
    });

    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Email failed:", error);
  }
};

module.exports = sendTestEmail;
