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

const removeItem = async(req, res) => {
    try {
        const { userId, productId } = req.params;
        const user = await User.findById(userId);
        const cart = await Cart.findById(user.cart);
        const productExist = cart.items.some(
            ({ product }) => product.toString() == productId
        );
        if (productExist) {
            await cart.updateOne({ $pull: { items: { product: productId } } });
        } else {
            return res.json({
                success: true,
                message: "Invalid request"
            });
        }
        const cartItems = await Cart.findById(user.cart).populate("items.product");
        return res.status(200).json({
            sucess: true,
            items: cartItems,
            message: "Product removed from cart",

        })

        //$pull
        // operator removes from an existing array all instances of a value or values that match a specified condition.
    } catch {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}


module.exports = {
    fetchAllCartItems,
    addToCart,
    removeItem,
};