const { Router } = require("express");
const router = Router();
const { fetchWishlistItems } = require("../controllers/wishlist.controller");


router.route("/fetch-wishlist/:userId").get(fetchWishlistItems);

module.exports = router;