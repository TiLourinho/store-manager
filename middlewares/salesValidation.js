const { salesSchema } = require('../utils/schemas');

const validateSales = (req, _res, next) => {
  const attributes = req.body;
  
  attributes.forEach(({ productId, quantity }) => {
    const { error } = salesSchema.validate({ productId, quantity });
    
    if (error) {
      if (error.details[0].type === 'any.required') {
        next({ status: 400, message: error.message });
      }
      next({ status: 422, message: error.message });
    }
  });
  next();
};

module.exports = validateSales;