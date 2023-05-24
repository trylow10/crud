const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.renderProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany( { orderBy: {
      id: 'desc',
    },}); 
       res.render('home', { products });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.renderHome = async (req, res) => {
  // const userId = req.user.id;
const userId =  parseInt(req.params.id);
  try {
    const products = await prisma.product.findMany( { orderBy: {
      id: 'desc',
    },});    const user = await prisma.user.findUnique({ where: { id:userId } });
    res.render('products', { user, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.renderEditPage = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await prisma.product.findUnique({ where: { id } });
    res.render('edit', { product });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error at rendering page' });
  }
};


exports.adminProducts = async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({ where: { id:userId } });
    const products = await prisma.product.findMany( { orderBy: {
      id: 'desc',
    },});
    res.render('adminProduct', { user, products });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addProduct =  (req,res)=>{
  res.render('addProduct')
;}

exports.getProductById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.createProduct = async (req, res) => {
  const product = {
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price)
  };
  try {
    const newProduct = await prisma.product.create({ data: product });
    res.redirect('/api/products/adminproduct');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const updates = {
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price)
  };

  try {
    await prisma.product.update({ where: { id }, data: updates });
    res.status(200).redirect(`/api/products/adminproduct`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.deleteProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.product.delete({ where: { id } });
    res.status(200).redirect(`/api/products/adminproduct`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

