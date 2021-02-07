import AWS from "aws-sdk";

const { DB_ENDPOINT, AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } = process.env;

AWS.config.update({
  endpoint: DB_ENDPOINT,
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

export const getItem = (params) => dynamoClient.get(params).promise();

export const query = (params) => dynamoClient.query(params).promise();

export const scanTable = async (tableName, limit = 100) => {
  const params = {
    TableName: tableName,
  };

  let scanResults = [];
  const items = await dynamoClient.scan(params).promise();

  //allow limit by slicing array
  if (items.Items.length > limit) {
    items.Items.length = limit;
  }
  items.Items.forEach((item) => scanResults.push(item));

  return scanResults;
};
