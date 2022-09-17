const mongoose = require("mongoose");


const adressSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required",
    },
    mobileNom: {
        type: String,
        trim: true,
        required: "Mobile number is required !",
    },
    adresse: {
        type: String,
        trim: true,
        required: "Adress is required !",
    },
    pinCode: {
        type: String,
        trim: true,
        required: "Pin Code is required !",
    },
    city: {
        type: String,
        rim: true,
        required: "City is required !",
    },
    state: {
        type: String,
        trim: true,
        required: "State is required !",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});


const Adress = mongoose.model("Adress", addressSchema);

module.exports = Address;