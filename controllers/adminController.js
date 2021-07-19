
const asyncHandler = require('express-async-handler');
const  Product  = require("../models/product")



const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find({})
    console.log("Product list found")
    res.json(products);
})


const getProductById = asyncHandler(async(req,res) => {
    const product =await Product.findById(req.params.id)
    if(product){
        console.log("Found your product")
        res.json(product)
    } else {
        res.status(404).json({message: "Product not found"})
    }
})

const createProduct = asyncHandler(async (req,res) => {
    
    console.log(req.body)
    const product = req.body
    const createProduct = await Product.create(product);
    res.status(201).send(createProduct)

})

const editProduct = asyncHandler(async(req,res) => {
    const id = req.params.id;
    const title = req.body.title;
    const price = req.body.price;
    const product = await Product.findById(id)
    if(product){
        product.title = title;
        product.price = price;
        product.save();
        console.log("Product updated successfully")
        res.status(200).json(product);
    }
})

const deleteProduct = asyncHandler(async(req,res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if(product){
        product.remove(id);
        console.log("Product deleted successfully")
        res.status(200).json({message:'Deleted product'})
    }
})

const restMachine = asyncHandler(async(req,res) => {
    const product= await Product.deleteMany({});
    if(product)
    {
        console.log("Machine has been reset");
        res.status(200).json({message:'Machine reset'})
    }
    
})

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct,
    restMachine
}