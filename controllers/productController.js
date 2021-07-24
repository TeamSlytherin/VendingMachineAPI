const asyncHandler = require("express-async-handler");
const Products = require("../models/product");
const Transaction = require("../models/transaction");
const coinAlgo = require("../utils/coinAlgo");
const generateToken = require('../utils/generateToken')

const getProduct = asyncHandler(async (req, res) => {
  const { penny, nickel, dime, quater, quantity, product_name } = req.body;
  
  const totalMoney = parseInt(penny) + parseInt(nickel * 5) + parseInt(dime * 10) + parseInt(quater * 25);
  console.log(totalMoney)
  const product = await Products.findOne({ title: product_name });
  console.log(product)
  
  
  //check
  if (totalMoney >= (product.price) && quantity <= (product.quantity)) {
    //update transaction table
    const orderDetail = {
      name: product_name,
      quantity: quantity,
      price: product.price,
      productID: product._id,
    };

    
    

    const createOrder = await Transaction.create({
      Orderedproduct: orderDetail,
      amountReceived: totalMoney,
    });

    res.status(201).json({
      message: "Please give a confirmation",
      token: generateToken(createOrder._id),
      orderDetails: orderDetail,
    });
  }

  //error
  else if (totalMoney < product.price) {
    res.status(400).json({ message: "Insufficient money" });
  } else {
    res.status(400).json({ message: "Sorry not able to process your request" });
  }
});

// After confirmation of product
const confirmProduct = asyncHandler(async (req, res) => {
  const { transactionDetails  } = req.body;

  console.log(transactionDetails);

  //check is secretKey exists

  //logic
  //const orderDetails = await Transaction.findOne({ userOrder._id })
  // const moneyReceived = transactionDetails.amountReceived;
  // const costPrice =
  // transactionDetails.Orderedproduct.price * transactionDetails.Orderedproduct.quantity;
  // const change = moneyReceived - costPrice;
  // // coinAlgo

  // const coin = coinAlgo(change);

  // if (coin) {
  //   console.log("Coin table updated");

  //   res
  //     .status(200)
  //     .json({
  //       Pennies: noOfPenny,
  //       Nickels: noOfNickel,
  //       Diemes: noOfDime,
  //       Quaters: noOfQuater,
  //     });
  // } else {
  //   //
  // }

    res.json({ message: "done"})
});

//After cancelling the product
const cancelTransaction = asyncHandler(async (req, res) => {
  const { userOrder, userId } = req.body;

  //const transactionId = req.params.id;
  const transaction = await Transaction.findById(transactionId);
  if (transaction) {
    transaction.remove(transactionId);
    console.log("Transaction deleted");
    res.status(200).json({ message: "Thank you for shopping with us." });
  }
});

module.exports = {
  getProduct,
  confirmProduct,
  cancelTransaction,
};
