const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const {
  mockProducts,
  mockProduct1,
  mockProductsServiceResponse,
  mockProductServiceResponse,
  successResponse, 
  product,
  removeFailedMock,
} = require('../mocks/products.mock');
const { productsController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Products', function () {
  it('p/roducts returns expected result', async function () {
    sinon.stub(productService, 'findAll').resolves(mockProductsServiceResponse);
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productsController.allProducts({}, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockProducts);
  });

  it('/products/:id with valid id returns expected result', async function () {
    sinon.stub(productService, 'findByID').resolves(mockProductServiceResponse);
    const req = {
      params: { id: 1 },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productsController.productsId(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockProduct1);
  });
  it('post request to /products returns expected result', async function () {
    sinon.stub(productService, 'addProduct').resolves(successResponse);
    const req = {
      body: { name: 'ProductX' },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productsController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(product);
});
it('Invalid request to delete /products/:id returns 404', async function () {
  sinon.stub(productModel, 'deleteProduct').resolves(-8);
  sinon.stub(productService, 'deleteProduct').resolves(removeFailedMock);
  const req = { params: { id: 5 } };
  const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
  await productsController.deleteProduct(req, res);

  expect(res.status).to.have.been.calledWith(404);
  expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
});

afterEach(function () {
  sinon.restore();
});
});