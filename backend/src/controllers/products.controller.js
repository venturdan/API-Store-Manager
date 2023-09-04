const { productService } = require('../services');
const errors = require('../routes/errorcodes');

const handleResponse = (res, { status, data, product }) => {
  if (product) {
    return res.status(status).json();
  }
  return res.status(errors(status)).json(data);
};

const allProducts = async (req, res) => {
  const { status, data } = await productService.findAll();
  return handleResponse(res, { status, data });
};

const productsId = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.findByID(id);
  return handleResponse(res, { status, data });
};

const insertProduct = async (req, res) => {
  const productData = req.body;
  const { status, data } = await productService.addProduct(productData);
  return handleResponse(res, { status, data });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productToUpdate = req.body;
  const { status, data } = await productService.updateProduct(id, productToUpdate);
  return handleResponse(res, { status, data });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data, product } = await productService.deleteProduct(id);

  return handleResponse(res, { status, data, product });
};

const findProduct = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await productService.findProduct(q);
  return handleResponse(res, { status, data });
};

module.exports = {
  allProducts,
  productsId,
  insertProduct,
  updateProduct,
  deleteProduct,
  findProduct,
};
