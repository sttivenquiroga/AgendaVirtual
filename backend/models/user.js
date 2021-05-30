const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    user: String,
    password: String,
    date: {type: Date, default: Date.now},
});

userSchema.methods.generateJWT = function(){
    return jwt.sign({
        _id: this._id,
        name: this.name,
        iat: moment().unix(),
    }, "SttivenQ")
};

const User = mongoose.model("user", userSchema);

module.exports = User;