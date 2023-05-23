const { validationResult } = require('express-validator');
const Product = require('../models/product');

exports.renderProducts = (req, res) => {
  // Perform database query or any other logic to get the products
  const products = [
    { name: 'Product 1', description: 'Description 1', price: 10 },
    { name: 'Product 2', description: 'Description 2', price: 20 },
    { name: 'Product 3', description: 'Description 3', price: 30 },
  ];
  res.render('home', { products });
};


exports.renderEditPage = async (req, res) => {
  try {
    const id = req.params.id;
    // Fetch the previous data based on the ID
    const product = await Product.getById(id);
    res.render('edit',{product});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error at redndering page' });
  };
};

exports.adminProducts=()=>{
  res.render('adminProduct')
}

exports.addProduct =  (req,res)=>{
  res.render('addProduct')
;}

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.status(200).render("adminProduct",{products});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getProductById = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.getById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  try {
    const newProduct = await Product.create(product);
    const products = await Product.getAll();
    res.status(201).render("adminProduct",{products});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = req.params.id;
  const updates = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };
  try {
    await Product.update(id, updates);
    res.status(200).redirect('/api/products/adminproduct/' + id);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }

};


exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  // console.log("id",id);
  try {
    await Product.delete(id);
    alert("Product deleted successfully");
    res.status(200).redirect('back');
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
