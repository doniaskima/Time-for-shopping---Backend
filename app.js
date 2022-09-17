require("dotenv").config();
const port = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { initializeDBConnection } = require("./config/db.config");

const userRouter = require("./routers/user.router");
const cartRouter = require("./routers/cart.router");
const productRouter = require("./routers/product.router");
const wishlistRouter = require("./routers/wishlist.router");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan());
initializeDBConnection();
const authenticate = require("./middleware/authenticate");
app.get("/", (req, res) => {
    return res.json({ status: "Welcome to Store server" });

});

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/carts", authenticate, cartRouter);
app.use("/wishlists", authenticate, wishlistRouter);

const Port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`backend server running on port ${port}`);
});