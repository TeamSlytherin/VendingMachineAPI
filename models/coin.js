const mongoose= require('mongoose')

const coinSchema = new mongoose.Schema(
    {
        noOfPenny:{
            type: Number,
            default: 0
        },

        noOfNickel: {
            type: Number,
            default: 0
        },
       
        noOfDime: {
            type: Number,
            default: 0
        },

        noOfQuater: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps:false,
    }
)

const Coin = mongoose.model('Coin', coinSchema);
module.exports=Coin;