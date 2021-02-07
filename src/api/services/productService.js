import { query, getItem, scanTable } from "../aws/dynamo";

const { PRODUCT_DB_NAME, STOCK_DB_NAME } = process.env;

export const getShoes = (limit) => scanTable(PRODUCT_DB_NAME, limit);

export const getShoeAndStockById = async (id) => {
  //get shoe
  const getShoe = getItem({
    TableName: PRODUCT_DB_NAME,
    Key: { id },
  });

  //get sizes for shoe
  const getSizes = query({
    TableName: STOCK_DB_NAME,
    KeyConditionExpression: "#key = :value",
    ExpressionAttributeNames: {
      "#key": "shoeId",
    },
    ExpressionAttributeValues: {
      ":value": id,
    },
  });

  //make both call same time
  const [shoe, sizes] = await Promise.all([getShoe, getSizes]);
  //transform data for frontend, shoe size key, stock value
  const mappedSizes = sizes.Items.reduce((acc, item) => {
    const { size, stock } = item;
    acc[size] = stock;
    return acc;
  }, {});

  return {
    ...shoe.Item,
    stock: mappedSizes,
  };
};
