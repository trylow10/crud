const { validationResult, body } = require('express-validator');

const validateProduct = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a numeric value'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {validateProduct};
