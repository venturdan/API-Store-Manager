const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { mockProducts, mockProduct1, productToBeAdd } = require('../mocks/products.mock');

describe('Products Model', function () {
  it('returns awaited results from endpoint', async function () {
    sinon.stub(connection, 'execute').resolves([mockProducts]);
    const products = await productModel.getAllProducts();

    expect(products).to.be.an('array');
    expect(products).to.deep.equal(mockProducts);
  });

  it('products endpoint returns the expected result', async function () {
    sinon.stub(connection, 'execute').resolves([[mockProduct1]]);
    const product = await productModel.productsId(1);

    expect(product).to.be.an('object');
    expect(product).to.deep.equal(mockProduct1);
  });

  it('products/:id endpoint returns the expected result', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const addProductId = await productModel.insertProduct(productToBeAdd.name);

    expect(addProductId).to.be.equal(4);
    expect(addProductId).to.be.a('number');
});

it('request to /products/:id returns deleted product', async function () {
  const productToDelete = { id: 1, name: 'Product 1' };
  sinon.stub(connection, 'execute').resolves([{ productToDelete }]);

  const deletedProduct = await productModel.deleteProduct(1);

  expect(deletedProduct).to.deep.equal(productToDelete);
});

  afterEach(function () {
    sinon.restore();
  });
});