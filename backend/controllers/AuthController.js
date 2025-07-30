// controllers/AuthController.js
const EmailService = require('../services/EmailService');
const VerificationService = require('../services/VerificationService');
const UserService = require('../services/UserService');

async function requestVerification(req, res) {
  const { email } = req.body;
  const pin = VerificationService.saveVerification(email);
  await EmailService.sendVerificationEmail(email, pin);
  res.json({ message: 'Código enviado para o seu e-mail.' });
}

async function confirmVerificationAndRegister(req, res) {
  const { email, password, provider, pin } = req.body;

  const isValid = VerificationService.verifyPin(email, pin);
  if (!isValid) return res.status(400).json({ error: 'Código inválido ou expirado.' });

  try {
    const user = await UserService.register(email, password, provider);
    res.status(201).json({ message: 'Usuário criado com sucesso.', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { requestVerification, confirmVerificationAndRegister };
