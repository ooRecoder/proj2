require('dotenv').config();
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.cookies?.token; // pega o token do cookie 'token'
  if (!token) return res.sendStatus(401); // não autorizado

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ex: { id: 123 }
    next();
  } catch (err) {
    return res.sendStatus(403); // token inválido ou expirado
  }
}

module.exports = authMiddleware;