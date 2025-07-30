const jwt = require('jsonwebtoken');

function generateToken(payload, hours) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: hours });
}

module.exports = generateToken;
