import { getVoucher } from "../services/voucherService";

export const getVoucherState = async (req, res, next) => {
  const result = await getVoucher(req.params.code);
  if (!result.Item) return res.json({ status: "INVALID" });

  res.json({
    status: result.Item.state,
  });
};
