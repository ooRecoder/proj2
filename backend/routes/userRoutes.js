const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const validate = require('../middlewares/validate')
const { loginSchema } = require('../validators/userValidator')

// Rotas públicas
router.post('/login', validate(loginSchema), UserController.login);

module.exports = router;
