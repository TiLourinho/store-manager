const { productsSchema } = require('../utils/schemas');

const validateProducts = (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error } = productsSchema.validate({ name, quantity });
  
  if (error) {
    if (error.details[0].type === 'any.required') {
      next({ status: 400, message: error.message });
    }
    next({ status: 422, message: error.message });
  }
  next();
};

module.exports = validateProducts;