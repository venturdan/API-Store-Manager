const mockProducts = [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do Capitão América',
    },
  ];

  const mockProduct1 = {
    id: 1,
    name: 'Martelo de Thor',
  };

  const mockProductsServiceResponse = {
    status: 'SUCCESSFUL',
    data: mockProducts,
  };

  const mockProductServiceResponse = {
    status: 'SUCCESSFUL',
    data: mockProduct1,
  };

  const notFoundErrorMessage = { message: 'Product not found' };

  const productToBeAdd = { name: 'ProductX' };

  const product = { id: 4, name: 'ProductX' };

  const successResponse = {
  status: 'CREATED',
  data: product,
};

const removeSucessMock = {
  status: 204,
  product: true,
};

const removeFailedMock = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
  product: false,
};

  module.exports = {
    mockProducts,
    mockProduct1,
    notFoundErrorMessage,
    mockProductServiceResponse,
    mockProductsServiceResponse,
    productToBeAdd,
    product,
    successResponse,
    removeFailedMock,
    removeSucessMock,
  };