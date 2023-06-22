const express = require('express');
const {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addProduct,
  adminProducts,
  renderEditPage,
  renderHome
} = require('../controller/productController');
const uploadImage = require("../middlewares/imageUpload");
const { authorizeRole, authenticateToken } = require('../middlewares/authMiddleware.js');
const { validateProduct } = require("../middlewares/validateProduct");

const router = express.Router();

router.get('/home/:id', [authenticateToken, authorizeRole('admin')], renderHome);

// Render add product page
router.get('/addproduct', [authenticateToken, authorizeRole('admin')], addProduct);

// Create new product
router.post('/addproduct', [authenticateToken, authorizeRole('admin'), uploadImage, validateProduct], createProduct);

router.get('/adminproduct', [authenticateToken, authorizeRole('admin')], adminProducts);

// Get product by ID
router.get('/:id', [authenticateToken, authorizeRole('admin')], getProductById);

// Render edit product page
router.get('/updateproduct/:id', [authenticateToken, authorizeRole('admin')], renderEditPage);

// Update product
// router.put('/updateproduct/:id', [authenticateToken, authorizeRole('admin'), uploadImage, validateProduct], updateProduct);
router.post('/updateproduct/:id', [authenticateToken, authorizeRole('admin'), uploadImage, validateProduct], updateProduct);

// Delete product
router.post('/:id', [authenticateToken, authorizeRole('admin')], deleteProduct);

module.exports = router;
