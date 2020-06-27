const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Review = new Schema({
    exercise_review: {
        type: String,
        required: true,
    },
    exercise_reps: {
        type: String,
        required: true,
    },
    exercise_reviewed: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Review", Review);