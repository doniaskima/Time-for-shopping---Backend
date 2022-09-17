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

const addToWishlist = async(req, res) => {
    try {
        const { userId, productId } = req.params;
        const user = await User.findById(userId);
        const wishlist = await Wishlist.findById(user.wishlist);
        if (wishlist) {
            const alreadyExist = wishlist.items.some(
                (product) => product.toString() == productId
            );
            if (!alreadyExist) {
                wishlist.items.push(productId);
                await wishlist.save();
            }
        } else {
            let newWishlist = new Wishlist({
                items: [productId],
                user: userId,
            });
            newWishlist = await newWishlist.save();
            await user.updateOne({ wishlist: newWishlist._id });
        }
        const newUser = await User.findById(userId);
        const wishlistItems = await Wishlist.findById(newUser.wishlist).populate(
            "items"
        );
        return res.json({
            success: true,
            items: wishlistItems,
            message: "product added to wishlist",
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = { fetchWishlistItems, addToWishlist };