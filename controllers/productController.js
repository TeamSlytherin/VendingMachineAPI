const asyncHandler = require('express-async-handler')
const Products = require('../models/product')



const getProduct = asyncHandler(async (req,res) => {

    const {no_nickel, no_penny, no_dime, product_name } = req.body;
    
    const totalMoney = //

    const product = await Products.findOne({title: product_name})


    //check 
    if(totalMoney >= product.price)
         //update transaction table


         res.json({
                
                
        })
    

       

    //logic

    //error
    re.staatus(400).json({message: "Paisa dee"})



    res.json()
})


const confirmProduct = asyncHandler(async (req,res) => {

    const { } = req.body

    //logic 
    //update coin table

    // coin algoooo


    res.json()

})


const cancelProduct = asyncHandler(async (req,res) => {

    const { } = req.body

    //logic




    res.json()

})