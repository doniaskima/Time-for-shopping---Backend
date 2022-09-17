const { Router } = require("express");
const router = Router();

const {
    fetchAllProducts,
    fetchProductById,
    createProduct,
    fetchFeaturedProducts,
    fetchProductCategories,
} = require("../controllers/product.controller");
router.route("/create").post(createProduct);
router.route("/").get(fetchAllProducts);
router.route("/single-product/:productId").get(fetchProductById);
router.route("/featured").get(fetchFeaturedProducts);
router.route("/categories").get(fetchProductCategories);

module.exports = router;