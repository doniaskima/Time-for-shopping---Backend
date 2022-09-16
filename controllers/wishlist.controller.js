const Wishlist = require("../models/wishlist.model");
const User = require("../models/user.model");



const fetchWishlistItems = async(req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        const wishlist = await Wishlist.findById(user.wishlist);
        if (!wishlist) {
            return res.json({
                success: false,
                message: "Wishlist hasn't been created yet"
            })
        }
        const listItems = await Wishlist.execPopulate({
            path: "items",
            populate: { path: "Product" },
        })
        console.log(listItems);
        return res.json({
            success: true,
            items: listItems,
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = { fetchWishlistItems };