const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { validateProduct } = require('../../../src/middlewares/validate.product');

const { expect } = chai;
chai.use(sinonChai);

describe('Product Validation', function () {
  it('Calls next middleware if request has "name" key', async function () {
    const next = sinon.stub().returns();
    const req = {
      body: { name: 'ProductX' },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await validateProduct(req, res, next);
    expect(next).to.have.been.calledWith();
  });

  it('Returns status 400', async function () {
    const next = sinon.stub().returns();
    const req = {
      body: {},
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await validateProduct(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('Returns status 422 and a message if key has less than 5 characters', async function () {
    const next = sinon.stub().returns();
    const req = {
      body: { name: 'Red' },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await validateProduct(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
});