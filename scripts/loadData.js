// Script to initialise a mock database for demo
const { dynamodbClient } = require("./aws");

const allShoes = require("./mockShoesData.json");
const allStocks = require("./mockStockData.json");
const allVouchers = require("./mockVouchersData.json");

// Load mock data
console.log("Importing data into DynamoDB...");

allShoes.forEach(function ({
  id,
  name,
  shortName,
  price,
  colour,
  imgUrl,
  size,
  stock,
}) {
  const params = {
    TableName: "Shoes",
    Item: {
      id,
      name,
      shortName,
      price,
      colour,
      imgUrl,
      size,
      stock,
    },
  };

  dynamodbClient.put(params, function (err, data) {
    if (err) {
      console.error("Unable to add shoe item", id);
    }
  });
});

allStocks.forEach(function ({ shoeId, size, stock }) {
  const params = {
    TableName: "Stock",
    Item: {
      shoeId,
      size,
      stock,
    },
  };

  dynamodbClient.put(params, function (err, data) {
    if (err) {
      console.error("Unable to add stock item", shoeId);
    }
  });
});

allVouchers.forEach(function ({ id, state }) {
  const params = {
    TableName: "Vouchers",
    Item: {
      id,
      state,
    },
  };

  dynamodbClient.put(params, function (err, data) {
    if (err) {
      console.error("Unable to add voucher item", id);
    }
  });
});

console.log("Done...");
