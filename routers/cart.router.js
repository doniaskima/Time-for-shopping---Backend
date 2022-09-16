const { Router } = require("express");
const router = Router();

const {
    addToCart,
    fetchAllCartItems,
} = require("../controllers/cart.controller");

router.route("/add-item/:userId/:productId").post(addToCart);
module.exports = router;