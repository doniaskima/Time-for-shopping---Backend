const _ = require('lodash');
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jesonwebtoken");


const loginUserAndSendCredentials = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email }).catch((err) =>
            console.log(err)
        );
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });
            return res.json({
                status: true,
                message: "Login Successful",
                user: _.pick(user, ["_id", "name", "email"]),
                token: token,
            });
        }
        return res.json({
            status: false,
            message: "Wrong Password!",
            user: null,
            token: null,
        });
    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
};