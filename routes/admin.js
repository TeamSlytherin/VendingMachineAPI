// const path = require('path');
const { Router } = require('express');
const { getProducts, getProductById, createProduct, editProduct, deleteProduct, restMachine } = require('../controllers/adminController')

const adminRouter = Router();


// url/admin/product

//url/product

// GET /admin/products
adminRouter.get('/products', getProducts );


//GET /admin/product/:id for a particular product
adminRouter.get('/products/:id', getProductById);

//POST /admin/createProduct
adminRouter.post('/createProduct', createProduct);


//PUT /admin/product/:id for a particular product update
adminRouter.put('/products/:id', editProduct);

//DELETE /admin/product/:id for a particular product deletion
adminRouter.delete('/products/:id', deleteProduct);

//DELETE /admin/resetProduct for reseting the machine
adminRouter.delete('/reset', restMachine)


module.exports= adminRouter;




