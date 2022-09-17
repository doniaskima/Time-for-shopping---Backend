const { Router } = require("express");
const router = Router();
const {
    fetchWishlistItems,
    addToWishlist,
} = require("../controllers/wishlist.controller");

router.route("/fetch-wishlist/:userId").get(fetchWishlistItems);
router.route("/add-item/:userId/:productId").post(addToWishlist);

module.exports = router;