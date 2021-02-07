import { getItem } from "../aws/dynamo";

export const getVoucher = (code) =>
  getItem({
    TableName: process.env.VOUCHER_DB_NAME,
    Key: { id: code },
  });
