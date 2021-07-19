const asyncHandler = require('express-async-handler');




const createOrder = asyncHandler(async (req,res) => {
    
    console.log(req.body)
    const order = req.body
    const createOrder = await Order.create(order);
    res.status(201).send(createOrder)

})


module.exports = {
    createOrder
}