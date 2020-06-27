const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Exercise = new Schema({
    exercise_title: {
        type: String,
        required: true
    },
    exercise_description: {
        type: String,
        required: true
    },
    exercise_image_url: {
        type: String
    },
    exercise_reps: {
        type: String,
        required: true
    },
    exercise_completed: {
        type: Boolean,
        required: true
    },
    exercise_creator: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Exercise", Exercise);