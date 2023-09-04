const { salesService } = require('../services');
const errors = require('../routes/errorcodes');

const handleResponse = (res, { status, data, product }) => {
  if (product) {
    return res.status(status).json();
  }
  return res.status(errors(status)).json(data);
};

const getAllSales = async (req, res) => {
  const { status, data } = await salesService.findAllSales();
  return handleResponse(res, { status, data });
};

const getSaleByID = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findSaleByID(id);
  return handleResponse(res, { status, data });
};

const createSale = async (req, res) => {
  const products = req.body;
  const { status, data } = await salesService.addSale(products);
  return handleResponse(res, { status, data });
};

const removeSale = async (req, res) => {
  const { id } = req.params;
  const { status, data, product } = await salesService.removeSale(id);
  return handleResponse(res, { status, data, product });
};

module.exports = {
  getAllSales,
  getSaleByID,
  createSale,
  removeSale,
};
