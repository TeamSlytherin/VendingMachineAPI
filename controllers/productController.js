const asyncHandler = require("express-async-handler");
const Products = require("../models/product");
const Transaction = require("../models/transaction");
const { noOfPenny } = require("../testing/data/coin");
const coinAlgo = require("../utils/coinAlgo");
const generateToken = require("../utils/generateToken");

const getProduct = asyncHandler(async (req, res) => {
  const { penny, nickel, dime, quater, quantity, product_name } = req.body;

  const totalMoney =
    parseInt(penny) +
    parseInt(nickel * 5) +
    parseInt(dime * 10) +
    parseInt(quater * 25);
  console.log(totalMoney);
  const product = await Products.findOne({ title: product_name });
  console.log(product);
  //check
  if (totalMoney >= product.price * quantity && quantity <= product.quantity) {
    //update transaction table
    const orderDetail = {
      name: product_name,
      quantity: quantity,
      price: product.price,
      productID: product._id,
    };
    const changeReceived = {
      noOfQuaters: quater,
      noOfDimes: dime,
      noOfNickel: nickel,
      noOfPenny: penny,
    };

    const createOrder = await Transaction.create({
      Orderedproduct: orderDetail,
      amountReceived: totalMoney,
      changeRecv: changeReceived,
    });

    res.status(201).json({
      message: "Please give a confirmation",
      token: generateToken(createOrder._id),
      orderDetails: orderDetail,
      changeReceived: changeReceived,
    });
  }
  //error
  else if (totalMoney < product.price * quantity) {
    res.status(400).json({ message: "Insufficient money" });
  } else {
    res.status(400).json({ message: "Sorry not able to process your request" });
  }
});

// After confirmation of product
const confirmProduct = asyncHandler(async (req, res) => {
  const { transactionDetails } = req.body;
  const product = await Products.findOne({
    title: transactionDetails.Orderedproduct.name,
  });
  product.quantity =
    product.quantity - transactionDetails.Orderedproduct.quantity;
  await product.save();
  //check is secretKey exists
  //logic
  const moneyReceived = transactionDetails.amountReceived;
  console.log(moneyReceived);
  const costPrice =
    transactionDetails.Orderedproduct.price *
    transactionDetails.Orderedproduct.quantity;
  const change = parseInt(moneyReceived) - parseInt(costPrice);

  // coinAlgo

  const coin = await coinAlgo(
    change,
    transactionDetails.changeRecv.noOfQuaters,
    transactionDetails.changeRecv.noOfDimes,
    transactionDetails.changeRecv.noOfNickel,
    transactionDetails.changeRecv.noOfPenny
  );

  if (coin) {
    console.log("Coin table updated");

    res.status(200).json(coin);
  } else {
    //
    res.status(400).json({});
  }
});

//After cancelling the product
const cancelTransaction = asyncHandler(async (req, res) => {
  const { transactionDetails } = req.body;

  const transaction = await Transaction.deleteOne({
    _id: transactionDetails._id,
  });
  if (transaction) {
    console.log("Transaction deleted");
    res.status(200).json({ message: "Thank you for shopping with us." });
  }
});

module.exports = {
  getProduct,
  confirmProduct,
  cancelTransaction,
};
