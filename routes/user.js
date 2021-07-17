// const { Router }  = require('express');
const express = require('express');
const userRouter = express.Router();

const asyncHandler = require('express-async-handler');
const  Order  = require("../models/order")

// const userRouter = Router();

//POST /user/createOrder
userRouter.post('/createOrder',asyncHandler(async (req,res) => {
    
    console.log(req.body)
    const order = req.body
    const createOrder = await Order.create(order);
    res.status(201).send(createOrder)

}));


module.exports = userRouter;
