const salesData = [
    {
      id: 1,
      date: '2021-09-09T04:54:29.000Z',
      productId: 1,
      quantity: 2,
    },
    {
      id: 1,
      date: '2021-09-09T04:54:54.000Z',
      productId: 2,
      quantity: 3,
    },
    {
      id: 2,
      date: '2021-09-09T04:54:31.000Z',
      productId: 2,
      quantity: 4,
    },
  ];

  const sale1Data = [
    {
      date: '2021-09-09T04:54:29.000Z',
      productId: 1,
      quantity: 2,
    },
  ];

  const salesDataService = {
    status: 'SUCCESSFUL',
    data: salesData,
  };

  const saleDataService = {
    status: 'SUCCESSFUL',
    data: sale1Data,
  };

  const newProducts = [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ];

  const addSale = {
    id: 3,
    itemsSold: newProducts,
  };

  const addSaleResponse = {
    status: 'CREATED',
    data: addSale,
  };

  module.exports = {
    salesData,
    sale1Data,
    salesDataService,
    saleDataService,
    newProducts,
    addSale,
    addSaleResponse,
  };  