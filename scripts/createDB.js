// Script to initialise a mock database for demo
const { dynamodb } = require("./aws");

const createShoesParams = {
  TableName: "Shoes",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }, //Partition key
  ],
  AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(createShoesParams, function (err, data) {
  if (err) {
    console.error("Unable to create shoes table.");
  } else {
    console.log("Created shoes table.");
  }
});

const createStockParams = {
  TableName: "Stock",
  KeySchema: [
    { AttributeName: "shoeId", KeyType: "HASH" }, //Partition key
    { AttributeName: "size", KeyType: "RANGE" }, //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "shoeId", AttributeType: "S" },
    { AttributeName: "size", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(createStockParams, function (err, data) {
  if (err) {
    console.error("Unable to create stock table.");
  } else {
    console.log("Created stock table.");
  }
});

const createVouchersParams = {
  TableName: "Vouchers",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }, //Partition key
  ],
  AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(createVouchersParams, function (err, data) {
  if (err) {
    console.error("Unable to create vouchers table.");
  } else {
    console.log("Created vouchers table.");
  }
});
