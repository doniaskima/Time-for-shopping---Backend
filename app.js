require("dotenv").config();
const port = process.env.PORT || 3000;
const express = require("esxpress");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routers/user.router");
const { initializeDBConnection } = require("./config/db.config");
const app = express();
app.use(bodyParser.json());
app.use(cors());
initializeDBConnection();



app.get("/", (req, res) => {
    return res.json({ status: "Welcome to Store server" });

});

app.use("/users", userRouter);

const Port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`backend server running on port ${port}`);
});