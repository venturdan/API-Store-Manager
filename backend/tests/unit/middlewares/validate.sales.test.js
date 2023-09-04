const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { validateProductIDs, validateProductQuantities } = require('../../../src/middlewares/validate.sales');

const { expect } = chai;
chai.use(sinonChai);

describe('Sales Validation', function () {
  it('Passes product IDs validation', async function () {
    const req = { body: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] };
    const res = { status: sinon.stub(), json: sinon.stub() };
    const next = sinon.stub();

    await validateProductIDs(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Fails for missing product IDs', async function () {
    const req = { body: [{ quantity: 1 }, { productId: 2, quantity: 5 }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateProductIDs(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('passes product quantities validation', async function () {
    const req = { body: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] };
    const res = { status: sinon.stub(), json: sinon.stub() };
    const next = sinon.stub();

    await validateProductQuantities(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Fails for invalid product quantities', async function () {
    const req = { body: [{ productId: 1 }, { productId: 2, quantity: 0 }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateProductQuantities(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });
});