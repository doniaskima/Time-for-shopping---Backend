const Product = require("../models/product.model");


const fetchAllProducts = async(_, res) => {
    try {
        const products = await Product.find({});
        return res.json({
            success: true,
            products: products,
        });
    } catch (error) {
        return res.json({
            success: false,
            products: null,
            message: error.message,
        });
    }
}

const fetchProductById = async(req, res) => {
    try {

        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (product) {
            return res.json({
                success: true,
                product: product,
            })
        }
        return res.json({
            success: false,
            product: null,
            message: "product not found",
        });
    } catch (error) {
        return res.json({
            success: false,
            product: null,
            message: error.message,
        });
    }
}

const createProduct = async(req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        brand: req.body.brand,
        about: req.body.about,
        rating: req.body.rating,
        isInStock: req.body.isInStock,
        freeShipping: req.body.freeShipping,
        fastDelivery: req.body.fastDelivery,
    });
    try {
        const savedProduct = await newProduct.save();
        return res.status(200).json(savedProduct);
    } catch (err) {
        return res.status(500).json(err);
    }
};
module.exports = { fetchAllProducts, fetchProductById, createProduct };