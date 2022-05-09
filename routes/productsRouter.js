const productsRouter = require('express').Router();
const rescue = require('express-rescue');
const validateProducts = require('../middlewares/productsValidation');

const ProductController = require('../controllers/ProductController');

productsRouter.get('/products', rescue(ProductController.getAll));
productsRouter.get('/products/:id', rescue(ProductController.getById));
productsRouter.post('/products', validateProducts);
productsRouter.put('/products/:id', validateProducts);

module.exports = productsRouter;