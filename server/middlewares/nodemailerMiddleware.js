const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const emailBaseTemplate = require('../utils/emailBaseTemplate');

dotenv.config();

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * sendEmail - Sends a professional HTML email using SendGrid
 * @param {Object} options - { to, subject, templateOptions, from, text }
 */
const sendEmail = async ({ to, subject, templateOptions = {}, from, text }) => {
  try {
    const html = emailBaseTemplate(templateOptions);

    const msg = {
      to,
      from: from || process.env.SENDER_EMAIL, // must be verified sender
      subject,
      html,
      text: text || templateOptions.message || '',
    };

    const response = await sgMail.send(msg);
    return response;
  } catch (error) {
    console.error('Error sending email:', error.response?.body || error);
    throw new Error('Email could not be sent!');
  }
};

module.exports = sendEmail;
