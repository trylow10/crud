const express = require('express');
const userRouts = require('./routes/userRouter');
const productRoutes = require('./routes/productRouter');
const productController = require('./controller/productController')
const userContoller = require('./controller/userController')
const path = require('path');
const pool = require('./db')
const app = express();
 require('dotenv').config()
const cookieParser = require('cookie-parser');
// ...
app.use(cookieParser());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// app.get("/addproduct",productController.addProduct)
app.get('/', productController.renderProducts);
app.get('/login',userContoller.renderLogin)
app.get('/register', userContoller.renderRegister);

// Routes
app.use('/api/auth', userRouts);
app.use('/api/products', productRoutes);

// Set the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes for rendering dynamic EJS views

// Start the server
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
