const validateProductIDs = (req, res, next) => {
    const products = req.body;
    const hasProductIDs = products.every((product) =>
      'productId' in product && product.productId !== undefined);
    if (!hasProductIDs) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    next();
  };

  const validateProductQuantities = (req, res, next) => {
    const products = req.body;
    const hasMissingQuantity = products.some((product) => !('quantity' in product));
    const hasInvalidQuantity = products.some((product) =>
      'quantity' in product && product.quantity <= 0);
    if (hasMissingQuantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    if (hasInvalidQuantity) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    next();
  };

  module.exports = {
    validateProductIDs,
    validateProductQuantities,
  };