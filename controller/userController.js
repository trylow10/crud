const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
require('dotenv').config();

exports.renderRegister = (req, res) => {
  res.render('register');
};
exports.renderLogin = (req, res) => {
  res.render('login');
};

exports.registerUser = async (req, res) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { username: req.body.username },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
    };

    const user = await prisma.user.create({ data: newUser });
  
    res.status(201).render('login', { user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { username },
    });    
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('jwt_cookie', token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    const products = await prisma.product.findMany( { orderBy: {
      id: 'desc',
    },}); 
    if (user.role === 'admin') {
      return res.status(200).render('adminProduct', {user, products, token });
    } else if (user.role === 'user') {
      return res.status(200).render('products', { user, token , products });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
