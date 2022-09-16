const { Router } = require("express");
const router = Router();

const {
    addToCart,
    fetchAllCartItems,
} = require("../controllers/cart.controller");

router.route("/add-item/:userId/:productId").post(addToCart);
router.route("/fetch-cart/:userId").get(fetchAllCartItems);
module.exports = router;