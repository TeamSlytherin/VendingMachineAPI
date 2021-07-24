

const coinAlgo = async (change) => {
  const coin = await Coin.findOne({});

  // coin algoooo
  const remChange = 0;
  const noOfQuater = change / 25;
  remChange = change % 25;
  if (remChange != 0) {
    const noOfDimes = remChange / 10;
    remChange = remChange % 10;
  }
  if (remChange != 0) {
    const noOfNickel = remChange / 5;
    remChange = remChange % 5;
  }
  if (remChange != 0) {
    const noOfPenny = remChange;
  }

  const penny = coin.noOfPenny - noOfPenny;
  const nickel = coin.noOfNickel - noOfNickel;
  const dime = coin.noOfDime - noOfDime;
  const quater = coin.noOfQuater - noOfQuater;

  if (coin) {
    coin.noOfPenny = penny;
    coin.noOfNickel = nickel;
    coin.noOfDime = dime;
    coin.noOfQuater = quater;

    coin.save();

    return true;
  }


  return false;

};

module.exports = coinAlgo;
