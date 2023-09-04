const { salesModel, productModel } = require('../models');

const handleNotFound = (message) => ({
  status: 'NOT_FOUND',
  data: { message },
});

const handleSuccess = (data) => ({
  status: 'SUCCESSFUL',
  data,
});

const findAllSales = async () => {
  const data = await salesModel.findAll();
  return data ? handleSuccess(data) : handleNotFound('Sales not found');
};

const findSaleByID = async (saleID) => {
  const data = await salesModel.findByID(saleID);
  return data && data.length > 0
    ? handleSuccess(data)
    : handleNotFound('Sale not found');
};

const existingId = async (products) => {
  const productExistsPromises = products.map(async ({ productId }) => {
    const productExists = await productModel.productsId(productId);
    return Boolean(productExists);
  });

  const results = await Promise.all(productExistsPromises);
  return results.every((check) => check);
};

const addSale = async (products) => {
  const verifyProducts = await existingId(products);
  if (!verifyProducts) {
    return handleNotFound('Product not found');
  }

  const id = await salesModel.createSaleWithProducts(products);
  const data = { id, itemsSold: products };
  return { status: 'CREATED', data };
};

const removeSale = async (id) => {
  const data = await salesModel.removeSale(id);
  if (data) {
    return { status: 204, product: true };
  }
  return handleNotFound('Sale not found');
};

module.exports = {
  findAllSales,
  findSaleByID,
  existingId,
  addSale,
  removeSale,
};
