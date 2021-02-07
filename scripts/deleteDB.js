// Script to cleanup mock database for demo
const { dynamodb } = require("./aws");

dynamodb.deleteTable({ TableName: "Shoes" }, function (err, data) {
  if (err) {
    console.error("Unable to delete shoes table.");
  } else {
    console.log("Deleted shoes table.");
  }
});

dynamodb.deleteTable({ TableName: "Stock" }, function (err, data) {
  if (err) {
    console.error("Unable to delete stock table.");
  } else {
    console.log("Deleted stock table.");
  }
});

dynamodb.deleteTable({ TableName: "Vouchers" }, function (err, data) {
  if (err) {
    console.error("Unable to delete vouchers table.");
  } else {
    console.log("Deleted vouchers table.");
  }
});
