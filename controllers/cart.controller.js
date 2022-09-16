const Cart = require("../models/cart.model");
const User = require("../models/user.model");

const fetchAllCartItems = async(req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (user.cart !== undefined) {
            const cart = await Cart.findById(user.cart).populate("items.product");
            return res.json({
                success: true,
                items: cart.items,
            });
        }
        return res.json({
            success: false,
            massage: "Cart hasn't been created yet",
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
};