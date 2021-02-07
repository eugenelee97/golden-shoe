import { getShoes, getShoeAndStockById } from "../services/productService";

export const getProduct = async (req, res, next) => {
  try {
    const result = await getShoeAndStockById(req.params.id);
    if (!result.id) {
      return res.status(404).send({ err: "Product not found" });
    }

    res.json(result);
  } catch (e) {
    next(e);
  }
};

export const listProducts = async (req, res, next) => {
  try {
    const products = await getShoes(req.query.limit);
    if (!products) res.status(404).send({ err: "No products found" });

    res.json({
      products,
    });
  } catch (e) {
    next(e);
  }
};
