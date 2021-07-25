const Coin = require("../models/coin");

const coinAlgo = async (
  change,
  recvQuater,
  recvDime,
  recvNickels,
  recvPenny
) => {
  console.log(change);
  const coin = await Coin.findOne({});

  // coin algoooo
  let remChange = 0;
  let noOfNickel, noOfDimes, noOfQuater, noOfPenny;
  noOfQuater = parseInt(change / 25);
  //console.log(noOfQuater)
  remChange = change % 25;

  if (remChange != 0) {
    noOfDimes = parseInt(remChange / 10);
    //console.log(noOfDimes)
    remChange = remChange % 10;
  }
  if (remChange != 0) {
    noOfNickel = parseInt(remChange / 5);
    //console.log(noOfNickel)
    remChange = remChange % 5;
  }
  if (remChange != 0) {
    noOfPenny = parseInt(remChange);
  }
  let userChange = {
    Pennies: noOfPenny,
    Nickels: noOfNickel,
    Dimes: noOfDimes,
    Quaters: noOfQuater,
  };
  console.log("User change", userChange);
  // const penny = parseInt(coin.noOfPenny) - parseInt(noOfPenny) + parseInt(recvPenny);
  // const nickel = parseInt(coin.noOfNickel) - parseInt(noOfNickel) + parseInt(recvNickels);
  // const dime = parseInt(coin.noOfDime) - parseInt(noOfDimes) + parseInt(recvDime);
  // const quater = parseInt(coin.noOfQuater) - parseInt(noOfQuater) + parseInt(recvQuater);
  const penny = coin.noOfPenny - noOfPenny + recvPenny;
  const nickel = coin.noOfNickel - noOfNickel + recvNickels;
  const dime = coin.noOfDime - noOfDimes + recvDime;
  const quater = coin.noOfQuater - noOfQuater + recvQuater;

  console.log(penny);
  console.log(nickel);
  console.log(dime);
  console.log(quater);

  coin.noOfPenny = penny;
  coin.noOfNickel = nickel;
  coin.noOfDime = dime;
  coin.noOfQuater = quater;

  await coin.save();

  return userChange;
};

module.exports = coinAlgo;
