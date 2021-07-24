const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
  
    Orderedproduct: {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      productID: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: "Product",
      },
    },

    amountReceived: {
      type: Number,
      default: 0,
    },
    change: {
      noOfQuaters: { type: Number, default: 0 },
      noOfDimes: { type: Number, default: 0 },
      noOfNickel: { type: Number, default: 0 },
      noOfPenny: { type: Number, default: 0 },
      totalChange: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
