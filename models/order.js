const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId, 
            ref : 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        },
        cent: {
            type: Number,
            default: 0
        },
        
        
    },
    {
        timestamps:true,
    }
)
    


const Order = mongoose.model('Order',orderSchema);
module.exports = Order;