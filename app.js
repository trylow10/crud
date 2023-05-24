const express = require('express');
const userRoutes = require('./routes/userRouter');
const productRoutes = require('./routes/productRouter');
const productController = require('./controller/productController')
const userController = require('./controller/userController')
const path = require('path');
const app = express();
require('dotenv').config()
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.get('/', productController.renderProducts);
app.get('/login',userController.renderLogin)
app.get('/register', userController.renderRegister);

app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
