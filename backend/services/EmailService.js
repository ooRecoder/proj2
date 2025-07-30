const { transporter } = require('../models/index')

async function sendVerificationEmail(to, pin) {
  await transporter.sendMail({
    from: process.env.EMAIL_SENDER,
    to,
    subject: 'Seu código de verificação',
    text: `Seu código de verificação é: ${pin}`
  });
}

module.exports = { sendVerificationEmail };
