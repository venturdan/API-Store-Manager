const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesMock, sale1Mock, addSale, newProducts } = require('../mocks/sales.mock');
const { mockProducts } = require('../mocks/products.mock');

describe('Sales Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('/sales returns sales data and a pass status', async function () {
    sinon.stub(salesModel, 'findAll').resolves([salesMock]);
    const response = await salesService.findAllSales();

    expect(response.status).to.equal('SUCCESSFUL');
    expect(response.data).to.deep.equal([salesMock]);
  });

  it('/sales/:id with a valid id returns sale data and a pass status', async function () {
    sinon.stub(salesModel, 'findByID').resolves([sale1Mock]);
    const response = await salesService.findSaleByID(1);

    expect(response.status).to.equal('SUCCESSFUL');
    expect(response.data).to.deep.equal([sale1Mock]);
  });

  it('/sales returns not found when there are no sales', async function () {
    sinon.stub(salesModel, 'findAll').resolves(undefined);
    const response = await salesService.findAllSales();

    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data).to.deep.equal({ message: 'Sales not found' });
  });

  it('sales/:id with a valid id returns not found when it does not exist', async function () {
    sinon.stub(salesModel, 'findByID').resolves([]);
    const response = await salesService.findSaleByID(10);

    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data).to.deep.equal({ message: 'Sale not found' });
  });
  it('adds a sale with product data when making request to /sales', async function () {
    sinon.stub(salesService, 'existingId').resolves(true);
    sinon.stub(productModel, 'productsId')
      .onFirstCall()
        .resolves(mockProducts[0])
      .onSecondCall()
        .resolves(mockProducts[1]);

    sinon.stub(salesModel, 'createSaleWithProducts').resolves(3);
    const sales = await salesService.addSale(newProducts);

    expect(sales.status).to.equal('CREATED');
    expect(sales.data).to.deep.equal(addSale);
  });
});