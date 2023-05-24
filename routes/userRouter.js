const express = require('express');
const { validateRegistration, validateLogin } = require('../middlewares/validateUser');
const { registerUser, loginUser,renderLogin } = require('../controller/userController');
const {logout} = require('../middlewares/authMiddleware')
const router = express.Router();
router.get('/login',renderLogin)
router.post('/login', validateLogin, loginUser);
router.post('/register', validateRegistration, registerUser);
router.get('/logout',logout)

module.exports = router;
