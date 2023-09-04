const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesData, sale1Data, salesDataService, saleDataService, addSaleResponse, addSale } = require('../mocks/sales.mock');
const { salesController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Sales Controller', function () {
  it('/sales endpoint returns expected result', async function () {
    sinon.stub(salesService, 'findAllSales').resolves(salesDataService);
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await salesController.getAllSales({}, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesData);
  });

  it('sales/:id endpoint returns expected result', async function () {
    sinon.stub(salesService, 'findSaleByID').resolves(saleDataService);
    const req = {
      params: { id: 1 },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await salesController.getSaleByID(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sale1Data);
  });

  it('creates a new sale with correct order data', async function () {
    sinon.stub(salesService, 'addSale').resolves(addSaleResponse);
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const req = { body: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] };
    await salesController.createSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(addSale);
});
});