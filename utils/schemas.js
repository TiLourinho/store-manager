const Joi = require('joi');

const productsSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const salesSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().integer().min(1).required(),
});

module.exports = {
  productsSchema,
  salesSchema,
};