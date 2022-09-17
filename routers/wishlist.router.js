const { Router } = require("express");
const router = Router();
const {
    fetchWishlistItems,
    addToWishlist,
    removeItem,
} = require("../controllers/wishlist.controller");

router.route("/fetch-wishlist/:userId").get(fetchWishlistItems);
router.route("/add-item/:userId/:productId").post(addToWishlist);
router.route("/remove-item/:userId/:productId").delete(removeItem);

module.exports = router;