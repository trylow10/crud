// authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const config = require('../config');
const Product = require('../models/product');
// const authorizeRole = require("../middlewares/authMiddleware")

exports.renderRegister = (req, res) => {
  res.render('register');
};
exports.renderLogin = (req, res) => {
  res.render('login');
};

exports.registerUser = async (req, res) => {
  let user;
  try {
    const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const existingUser = await User.findByUsername(req.body.username);

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
    };
    const user = await User.create(newUser);
    res.status(201).render("products",{user})
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
    // Check if the user exists
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username, role: user.role }, config.jwtSecret, {
      expiresIn: '1h',
    });

    // Set the token as a cookie
    res.cookie('jwt_cookie', token, {
      httpOnly: true,
      maxAge: 3600000,
      // other cookie options if needed
    });

    const products = await Product.getAll();
    // Render different templates based on user role
    if (user.role === 'admin') {
      return res.status(200).render('adminProduct', { products, token });
    } else if (user.role === 'user') {
      return res.status(200).render('products', { user, token });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
