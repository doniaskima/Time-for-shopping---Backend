const { Router } = require("express");
const router = Router();

const {
    fetchAllProducts,
    fetchProductById,
    createProduct,
} = require("../controllers/product.controller");
router.route("/create").post(createProduct);
router.route("/").get(fetchAllProducts);
router.route("/single-product/:productId").get(fetchProductById);

module.exports = router;