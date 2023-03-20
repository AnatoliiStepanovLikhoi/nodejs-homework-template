const joi = require('joi');

const usersValidationSchema = joi.object({
  email: joi.string().trim().email().required(),
  password: joi
    .string()
    .min(7)
    .regex(/^[a-zA-Z0-9]{7,30}$/)
    .required(),
});

const usersSubscriptionValidationSchema = joi.object({
  subscription: joi
    .string()
    .trim()
    .valid('starter', 'pro', 'business')
    .required(),
});

module.exports = {
  usersValidationSchema,
  usersSubscriptionValidationSchema,
};
