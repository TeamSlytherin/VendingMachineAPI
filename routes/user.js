// const { Router }  = require('express');
const express = require('express');
const { createOrder } = require('../controllers/userController');
const userRouter = express.Router();


// const userRouter = Router();

//POST /user/createOrder
userRouter.post('/createOrder', createOrder);


module.exports = userRouter;
