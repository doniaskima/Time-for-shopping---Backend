const Cart = require("../models/cart.model");
const User = require("../models/user.model");

const fetchAllCartItems = async(req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        const cart = await Cart.findById(user.cart);
        if (!cart) {
            return res.json({
                success: false,
                massage: "Cart hasn't been created yet",
            });
        }
        const cartItems = await cart.execPopulate({
            path: "items",
            populate: { path: "Product" },
        });
        console.log(cartItems);
        return res.json({
            success: true,
            items: cartItems,
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
};

const addToCart = async(req, res) => {
    try {
        const { userId, productId } = req.params;
        const user = await User.findById(userId);
        const cart = await Cart.findById(user.cart);
        if (cart) {
            const alreadyExist = cart.items.some(
                ({ product }) => product.toString() == productId
            );
            //The some() method tests whether at least one element in the array passes the test implemented by the provided function.
            //It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false.

            if (!alreadyExist) {
                cart.items.push({
                    product: productId,
                    quantity: 1,
                })
                await cart.save()
            }
        } else {
            let newCart = new Cart({
                items: [{ product: productId, quantity: 1 }],
                user: userId,
            });
            newCart = await newCart.save();
            await user.updateOne({ cart: newCart._id })

        }
        const newUser = await User.findById(userId);
        const cartItems = await Cart.findById(newUser.cart).populate("items.product");
        return res.json({
            succes: true,
            items: cartItems,
            message: "product added to cart"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
}


module.exports = {
    fetchAllCartItems,
    addToCart,
};