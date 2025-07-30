function generatePin(length = 6) {
  return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
}

module.exports = generatePin;
