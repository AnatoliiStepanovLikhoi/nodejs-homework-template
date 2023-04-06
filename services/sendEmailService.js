// !Sendgrig
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { HOST, SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const sendUserVerificationEmail = async (email, token) => {
  const verificationMessage = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: 'Contacts APP user registration',
    text: `Please finish your registration by verifing your email ${HOST}/api/users/verify/${token}`,
    html: `<Please finish your registration by <a href="${HOST}/api/users/verify/${token}">verifing</a> your email!</p>`,
  };

  try {
    await sgMail.send(verificationMessage);
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendUserVerificationEmail;
