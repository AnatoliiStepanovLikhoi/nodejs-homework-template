const joi = require('joi');

const addContactSchema = joi.object({
  name: joi.string().trim().alphanum().min(2).max(30).required(),
  email: joi.string().email().required(),
  phone: joi.string().trim().min(7).max(15).required(),
});

const updateContactSchema = joi
  .object({
    name: joi.string().trim().alphanum().min(2).max(30),
    email: joi.string().email(),
    phone: joi.string().trim().min(7).max(15),
  })
  .min(1);

module.exports = { addContactSchema, updateContactSchema };
