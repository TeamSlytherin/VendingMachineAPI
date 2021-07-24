const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Transaction = require('../models/transaction')

const verifyToken = asyncHandler(async(req,res,next) => {

    console.log("in auth function")
    let token;
    if(req.headers.authorization &&  req.headers.authorization.startsWith('Bearer')){
        console.log('In if condition')
        try{

            token=req.headers.authorization.split(" ")[1];

            const decodedToken = jwt.verify(token,process.env.JWT_SECRET)

            console.log('BEFORE TRANSACTION IN AUTH')
            
            req.body.transactionDetails = await Transaction.findById(decodedToken.id)
            console.log('AFTER TRANSACTION IN AUTH')
            next()

        } catch (err){
            console.log(err);

            res.status(401).json({ message: "Not authorized , token failed"})
        }
    }else {
        console.log('in else function')
    }
})





module.exports = verifyToken