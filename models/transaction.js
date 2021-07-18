const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema(
    {
        Orderedproduct: [
            {
                name: {type : String, required: true},
                quantity: {type: Number, required: true},
                price: {type: Number, required: true},
                productID: {
                    type: mongoose.Schema.Types.ObjectID,
                    required: true,
                    ref: "Product"
                },
            },
        ],
        amountReceived: {
            type: Number,
            default: 0
        },
        change:
        {
            type: Number,
            default: 0
        }
        
        
    },
    {
        timestamps:true,
    }
)
    


const Order = mongoose.model('Order',orderSchema);
module.exports = Order;