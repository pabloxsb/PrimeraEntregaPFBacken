//  IMPORTS

const express = require('express');
const productsRoutes = require('./api/products/products.routes')
const cartsRoutes = require('./api/carts/carts.routes')

//  INITIALIZATIONS

const PORT = 8080;
const app = express();

//  MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`__dirname/public`));

//  ROUTES

app.use('/products', productsRoutes);
app.use('/carts', cartsRoutes)

app.listen(PORT, () => {
console.log(`[SERVER] Server listening on port :::::: ${PORT}`);
});