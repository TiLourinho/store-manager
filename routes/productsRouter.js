const productsRouter = require('express').Router();
const rescue = require('express-rescue');
const validateProducts = require('../middlewares/productsValidation');

const ProductController = require('../controllers/ProductController');

productsRouter.get('/products', rescue(ProductController.getAll));
productsRouter.get('/products/:id', rescue(ProductController.getById));
productsRouter.post('/products', validateProducts, rescue(ProductController.create));
productsRouter.put('/products/:id', validateProducts, rescue(ProductController.update));
productsRouter.delete('/products/:id', rescue(ProductController.remove));

module.exports = productsRouter;