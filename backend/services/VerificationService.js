const generatePin = require('../utils/generatePIN');

const verificationCache = new Map();

function saveVerification(email) {
  const pin = generatePin();
  verificationCache.set(email, { pin, expires: Date.now() + 5 * 60 * 1000 }); // 5 minutos
  return pin;
}

function verifyPin(email, inputPin) {
  const record = verificationCache.get(email);
  if (!record) return false;
  const isValid = record.pin === inputPin && Date.now() < record.expires;
  if (isValid) verificationCache.delete(email); // remove após validar
  return isValid;
}

module.exports = { saveVerification, verifyPin };
