  const express = require('express');
  const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, addProduct,adminProducts,renderEditPage } = require('../controller/productController');
  const {authorizeRole,authenticateToken} = require('../middlewares/authMiddleware.js');

  const router = express.Router();

  router.get('/addproduct',[authenticateToken,authorizeRole('admin')],addProduct);
  router.get('/', authenticateToken,authorizeRole('admin'), getAllProducts);
  router.get('/:id', authenticateToken, getProductById);
  router.get('/adminproduct',[authenticateToken,authorizeRole('admin'),adminProducts])
  router.post('/addproduct', [authenticateToken, authorizeRole('admin')], createProduct);
  router.get('/updateproduct/:id', [authenticateToken, authorizeRole('admin')], renderEditPage);
  router.post('/updateproduct/:id', [authenticateToken, authorizeRole('admin')], updateProduct);
  router.put('/:id/', [authenticateToken, authorizeRole('admin')], updateProduct);
  router.delete('/:id', [authenticateToken, authorizeRole('admin')], deleteProduct);

  module.exports = router;
