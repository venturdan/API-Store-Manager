const { productModel } = require('../models');

const findAll = async () => {
  const data = await productModel.getAllProducts();
  if (!data) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Product not found' },
    };
  }
  return {
    status: 'SUCCESSFUL',
    data,
  };
};

const findByID = async (productID) => {
  const data = await productModel.productsId(productID);
  if (!data || data.length === 0) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Product not found' },
    };
  }
  return {
    status: 'SUCCESSFUL',
    data,
  };
};

const addProduct = async (product) => {
  const { name } = product;
  const id = await productModel.insertProduct(name);
  return { status: 'CREATED', data: { id, name } };
};

const updateProduct = async (id, element) => {
  const { name } = element;
  const product = await productModel.productsId(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  await productModel.updateProduct(id, name);
  return { status: 'SUCCESSFUL', data: { id: Number(id), name } };
};

const deleteProduct = async (id) => {
  const product = await productModel.productsId(id);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' }, product: false };
  }

  await productModel.deleteProduct(id);
  return { status: 204, product: true };
};

const findProduct = async (name) => {
  const data = await productModel.findProduct(name);
  return { status: 'SUCCESSFUL', data };
};

module.exports = {
  findAll,
  findByID,
  addProduct,
  updateProduct,
  deleteProduct,
  findProduct,
};
