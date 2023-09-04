const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesData, sale1Data, newProducts } = require('../mocks/sales.mock');

describe('Sales Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('returns sales data from /sales', async function () {
    sinon.stub(connection, 'execute').resolves([salesData]);
    const sales = await salesModel.findAll();

    expect(sales).to.be.an('array');
    expect(sales).to.deep.equal(salesData);
  });

  it('returns data sales from /sales/:id endpoint', async function () {
    sinon.stub(connection, 'execute').resolves([sale1Data]);
    const sale = await salesModel.findByID(1);

    expect(sale).to.be.an('array');
    expect(sale).to.deep.equal(sale1Data);
  });
  it('expected result from endpoint /sales', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const saleId = await salesModel.createSaleWithProducts(newProducts);

    expect(saleId).to.equal(3);
    expect(saleId).to.be.a('number');
  });
});