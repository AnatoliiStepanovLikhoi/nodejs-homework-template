const joi = require('joi');

const addContactSchema = joi.object({
  name: joi.string().trim().min(2).max(30).required(),
  email: joi.string().email().required(),
  phone: joi.string().trim().min(7).max(15).required(),
  favorite: joi.boolean(),
});

const updateContactSchema = joi
  .object({
    name: joi.string().trim().alphanum().min(2).max(30),
    email: joi.string().email(),
    phone: joi.string().trim().min(7).max(15),
    favorite: joi.boolean(),
  })
  .min(1);

const updateContactStatusSchema = joi.object({
  favorite: joi.boolean().required(),
});

module.exports = {
  addContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
};
