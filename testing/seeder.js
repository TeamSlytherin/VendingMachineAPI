const dotenv = require('dotenv')
const Product = require('../models/product')
const connectDB = require('../config/db')
const products = require('./data/products')
dotenv.config()

connectDB()


const importData = async () => {
    try{
        await Product.deleteMany()

        const createProduct = await Product.insertMany(products)
        console.log(`Data imported`)
        process.exit()
    } catch (err){
        console.log(err.message)
        process.exit(1)
    }
}