const dotenv = require('dotenv')
const Product = require('../models/product')
const connectDB = require('../config/db')
const products = require('./data/products')
const Coin = require('../models/coin')
const coins = require('./data/coin')
dotenv.config()

connectDB()


const importData = async () => {
    try{
        //await Product.deleteMany()

        const createProduct = await Product.insertMany(products)
        const createCoin = await Coin.insertMany(coins)

        console.log(`Data imported`)
        process.exit()
    } catch (err){
        console.log(err.message)
        process.exit(1)
    }
}
importData()