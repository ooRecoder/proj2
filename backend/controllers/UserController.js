const { registerSchema, loginSchema } = require('../validators/userValidator');
const UserService = require('../services/UserService');
const generateToken = require('../utils/generateToken');

async function login(req, res) {
  const { email, password } = req.body;
  const user = await UserService.authenticate(email, password);
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

  const token = generateToken({ id: user.id }, '4h');
  
  // Define o cookie com o token JWT
  res.cookie('token', token, {
    httpOnly: true,       // Impede acesso via JS no navegador
    secure: process.env.NODE_ENV === 'production', // Só envia em HTTPS (em produção)
    sameSite: 'strict',   // Protege contra CSRF (ajuste conforme necessidade)
    maxAge: 4 * 60 * 60 * 1000, // Expira em 4 horas (mesma duração do token)
  });

  // Retorna apenas status OK, sem enviar o token no corpo
  res.status(200).json({ message: 'Login realizado com sucesso' });
}

async function deleteUser(req, res) {
  try {
    const success = await UserService.deleteById(req.user.id);
    if (!success) return res.status(404).json({ error: 'Usuário não encontrado' });

    return res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao deletar o usuário' });
  }
}

module.exports = { login, deleteUser };