const express = require('express');
const { validateRegistration, validateLogin } = require('../middlewares/validateUser');
const { registerUser, loginUser,renderLogin } = require('../controller/userController');
const {logout} = require("../middlewares/authMiddleware")

const router = express.Router();
router.get('/login',renderLogin)
router.get('/logut',renderLogin)
router.post('/register', validateRegistration, registerUser);
router.post('/login', validateLogin, loginUser);

module.exports = router;
