const Joi = require('joi');

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email inválido',
    'string.empty': 'Email é obrigatório'
  }),
});

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  provider: Joi.string().optional().allow('', null),
  pin: Joi.string().length(6).required().messages({
    'string.length': 'O PIN deve ter 6 dígitos',
    'any.required': 'O PIN é obrigatório'
  }),
});

module.exports = {
  verifyEmailSchema,
  registerSchema
};
