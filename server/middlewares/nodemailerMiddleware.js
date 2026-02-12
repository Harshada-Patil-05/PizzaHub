const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

const sendTestEmail = async () => {
  try {
    console.log("Trying to send email...");

    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL, // send to yourself
      subject: "Test Email from Render",
      text: "If you receive this, nodemailer works!",
    });

    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Email failed:", error);
  }
};

module.exports = sendTestEmail;
