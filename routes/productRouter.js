const express = require('express');
const {
  // getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addProduct,
  adminProducts,
  renderEditPage,
  renderHome
} = require('../controller/productController');
const { authorizeRole, authenticateToken } = require('../middlewares/authMiddleware.js');
const {validateProduct} = require("../middlewares/validateProduct")
const router = express.Router();

router.get('/home/:id', [authenticateToken, authorizeRole('admin')], renderHome);

// Render add product page
router.get('/addproduct', [authenticateToken, authorizeRole('admin')], addProduct);

// Create new product
router.post('/addproduct', [authenticateToken, authorizeRole('admin'),validateProduct], createProduct);

router.get('/adminproduct', [authenticateToken, authorizeRole('admin')], adminProducts);
// Get product by ID
router.get('/:id', [authenticateToken, authorizeRole('admin')], getProductById);


// Render edit product page
router.get('/updateproduct/:id', [authenticateToken, authorizeRole('admin')], renderEditPage);

// Update product
router.post('/updateproduct/:id', [authenticateToken, authorizeRole('admin')], updateProduct);
// router.put('/:id', [authenticateToken, authorizeRole('admin')], updateProduct);

router.post('/:id', [authenticateToken, authorizeRole('admin')], deleteProduct);


module.exports = router;
