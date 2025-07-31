const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');

// Garante que a pasta logs existe
const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // log no terminal
    new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    new transports.File({ filename: path.join(logDir, 'combined.log') })
  ]
});

// Interface personalizada para manter compatibilidade com seu controller
module.exports = {
  info: (module, message) => logger.info(`[${module}] ${message}`),
  warn: (module, message) => logger.warn(`[${module}] ${message}`),
  error: (module, message, err) => {
    const errorMessage = `${message} ${err?.stack || err}`;
    logger.error(`[${module}] ${errorMessage}`);
  }
};
