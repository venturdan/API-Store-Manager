const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateProduct } = require('../middlewares/validate.product');

route.get('/', productsController.allProducts);
route.get('/search', productsController.findProduct);
route.get('/:id', productsController.productsId);
route.post('/', validateProduct, productsController.insertProduct);
route.put('/:id', validateProduct, productsController.updateProduct); 
route.delete('/:id', productsController.deleteProduct);

module.exports = route;