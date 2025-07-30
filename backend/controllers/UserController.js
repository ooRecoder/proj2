const { registerSchema, loginSchema } = require('../validators/userValidator');
const UserService = require('../services/UserService');
const generateToken = require('../utils/generateToken');

async function login(req, res) {
  const { email, password } = req.body;
  const user = await UserService.authenticate(email, password);
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

  const token = generateToken({ id: user.id }, '4h');
  res.json({ token });
}

module.exports = { login };