const EmailService = require('../services/EmailService');
const VerificationService = require('../services/VerificationService');
const UserService = require('../services/UserService');
const Logger = require('../utils/logger');

const MODULE = 'AuthController';

async function requestVerification(req, res) {
  const { email } = req.body;
  Logger.info(MODULE, `Solicitação de verificação recebida para o e-mail: ${email}`);

  try {
    const pin = VerificationService.saveVerification(email);
    Logger.info(MODULE, `PIN gerado para ${email}: ${pin}`);

    await EmailService.sendVerificationEmail(email, pin);
    Logger.info(MODULE, `E-mail de verificação enviado para: ${email}`);

    res.json({ message: 'Código enviado para o seu e-mail.' });
  } catch (err) {
    Logger.error(MODULE, `Erro ao enviar código para ${email}:`, err);
    res.status(500).json({ error: 'Erro ao enviar código de verificação.' });
  }
}

async function confirmVerificationAndRegister(req, res) {
  const { email, password, provider, pin } = req.body;
  Logger.info(MODULE, `Confirmação de verificação para: ${email}`);

  const isValid = VerificationService.verifyPin(email, pin);
  if (!isValid) {
    Logger.warn(MODULE, `Código inválido ou expirado para: ${email}`);
    return res.status(400).json({ error: 'Código inválido ou expirado.' });
  }

  try {
    const user = await UserService.register(email, password, provider);
    Logger.info(MODULE, `Usuário registrado com sucesso: ${email}`);
    res.status(201).json({ message: 'Usuário criado com sucesso.', user });
  } catch (err) {
    Logger.error(MODULE, `Erro ao registrar usuário ${email}:`, err);
    res.status(400).json({ error: err.message });
  }
}

module.exports = { requestVerification, confirmVerificationAndRegister };
