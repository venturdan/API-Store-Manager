const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateProductIDs, validateProductQuantities } = require('../middlewares/validate.sales');

route.get('/', salesController.getAllSales);
route.get('/:id', salesController.getSaleByID);
route.post('/', validateProductIDs, validateProductQuantities, salesController.createSale);

route.delete('/:id', salesController.removeSale);

module.exports = route;