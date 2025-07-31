const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware')
const validate = require('../middlewares/validate')
const { loginSchema } = require('../validators/userValidator')

// Rotas públicas
router.post('/login', validate(loginSchema), UserController.login);
router.delete('/delete', authMiddleware, UserController.deleteUser)

module.exports = router;
