const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { mockProducts, mockProduct1, productToBeAdd, product } = require('../mocks/products.mock');

describe('Products Service', function () {
  it('/products endpoint returns the expected result', async function () {
    sinon.stub(productModel, 'getAllProducts').resolves([mockProducts]);
    const response = await productService.findAll();
    expect(response.data).to.be.deep.equal([mockProducts]);
    expect(response.status).to.be.equal('SUCCESSFUL');
  });
  
  it('/products/:id with a valid id returns the expected result', async function () {
    sinon.stub(productModel, 'productsId').resolves([mockProduct1]);
    const response = await productService.findByID(1);
    expect(response.status).to.equal('SUCCESSFUL');
    expect(response.data).to.deep.equal([mockProduct1]);
  });
  it('/products endpoint with an error returns the expected result', async function () {
    sinon.stub(productModel, 'getAllProducts').resolves(undefined);
    const response = await productService.findAll();
    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data).to.be.deep.equal({ message: 'Product not found' });
  });
  it('/products/:id with a valid id and an error returns the expected result', async function () {
    sinon.stub(productModel, 'productsId').resolves([]);
    const response = await productService.findByID(10);
    expect(response.status).to.be.equal('NOT_FOUND');
    expect(response.data).to.be.deep.equal({ message: 'Product not found' });
  });
  it('Valid request to /products endpoint returns the expected result', async function () {
    sinon.stub(productModel, 'insertProduct').resolves(4);
    const responseProduct = await productService.addProduct(productToBeAdd);
                                                                                        
    expect(responseProduct.status).to.equal('CREATED');

    expect(responseProduct.data).to.deep.equal(product);
});
it('Valid remove request to /products/:id returns a success response', async function () {
  sinon.stub(productModel, 'productsId').resolves({ id: 1, name: 'Product 1' });
  sinon.stub(productModel, 'deleteProduct').resolves();

  const response = await productService.deleteProduct(1);

  expect(response).to.deep.equal({ status: 204, product: true });
});

  afterEach(function () {
    sinon.restore();
  });
});