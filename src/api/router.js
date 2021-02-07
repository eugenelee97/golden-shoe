import express from "express";
import { listProducts, getProduct } from "./controllers/productController";
import { getVoucherState } from "./controllers/voucherController";

const router = express.Router();

router.get("/products", listProducts);
router.get("/product/:id", getProduct);

router.get("/voucher/:code", getVoucherState);

export default router;
