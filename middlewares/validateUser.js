
const { check } = require('express-validator');

exports.validateRegistration = [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required'),
  check('role').isIn(['ADMIN', 'USER']).withMessage('Role is invalid'),
];

exports.validateLogin = [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required'),
];
