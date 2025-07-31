const bcrypt = require('bcrypt');
const { User } = require('../models');

async function register(email, password, provider) {
  const hashed = await bcrypt.hash(password, 10);
  return await User.create({ email, password: hashed, provider });
}

async function authenticate(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  return match ? user : null;
}

async function deleteById(userId) {
  const user = await User.findByPk(userId);
  if (!user) return false;

  await user.destroy();
  return true;
}

module.exports = { register, authenticate, deleteById };