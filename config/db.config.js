const mongoose = require("mongoose");
require("dotenv").config();


function initializeDBConnection() {
    mongoose.connect(process.env.MONGO_DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => console.log("SUCCESSFULLY CONNECTED"))
        .catch((error) => console.error("mongoose connection failed...", error))
}

module.exports = { initializeDBConnection };