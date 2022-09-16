const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String },
    price: { type: mongoose.Schema.Types.Number },
    brand: { type: mongoose.Schema.Types.String },
    details: { type: mongoose.Schema.Types.String },
    rating: { type: mongoose.Schema.Types.Number },
    inInStock: { type: mongoose.Schema.Types.Boolean },
    freeShipping: { type: mongoose.Schema.Types.Boolean },
    fastDelivery: { type: mongoose.Schema.Types.Boolean },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;