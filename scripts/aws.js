const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  accessKeyId: "foo",
  secretAccessKey: "bar",
});

const dynamodb = new AWS.DynamoDB();
const dynamodbClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
  dynamodb,
  dynamodbClient,
};
