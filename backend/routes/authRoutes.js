const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const validate = require('../middlewares/validate');
const { verifyEmailSchema, registerSchema } = require('../validators/authValidator');

// Rota para solicitar envio de PIN por email
router.post('/verify-email', validate(verifyEmailSchema), AuthController.requestVerification);

// Rota para registrar usuário com PIN validado
router.post('/register', validate(registerSchema), AuthController.confirmVerificationAndRegister);

module.exports = router;
