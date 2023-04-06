// !Sendgrig
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { PORT, SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const sendUserVerificationEmail = async (email, token) => {
  const verificationMessage = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: 'Contacts APP user registration',
    html: `<p>Please finish your registration by <a href="http://localhost:${PORT}/api/users/verify/${token}">verifing</a> your email!</p>`,
  };

  try {
    await sgMail.send(verificationMessage);
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendUserVerificationEmail;
