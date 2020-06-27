const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("User", User);