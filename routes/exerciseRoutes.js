const express = require("express");
const exerciseRoutes = express.Router();
const bodyParser = require("body-parser");

let Exercise = require("../models/exercise.model");
let Review = require("../models/review.model");

exerciseRoutes.use(bodyParser.json());

exerciseRoutes.route("/").post((req, res) => {
    Exercise.find((err, exercises) => {
        if (err) return console.log(err);
        const currentUserExercises = [];
        exercises.forEach((exercise) => {
            if (exercise.exercise_creator === req.body.email) currentUserExercises.push(exercise);
        })
        res.json(currentUserExercises);
    });
});

exerciseRoutes.route("/completed").get((req, res) => {
    Review.find((err, reviews) => {
        if (err) return console.log(err);
        res.json(reviews);
    });
});

exerciseRoutes.route("/delete/:id").post((req, res) => {
    Exercise.findByIdAndDelete(req.params.id, req.body, (err, exercise) => {
        if (err) return console.log(err);
        res.json(exercise);
    });
});

exerciseRoutes.route("/:id").get((req, res) => {
    let id = req.params.id;
    Exercise.findById(id, (err, exercise) => {
        if (err) return console.log(err);
        res.json(exercise);
    });
});

exerciseRoutes.route("/add").post((req, res) => {
    let exercise = new Exercise(req.body);
    exercise.save()
        .then(exercise => {
            res.status(200).json({"exercise": "Exercise Added Successfully"});
        })
        .catch(err =>  {
            res.status(400).json({"errMsg": "Adding New Exercise Failed"});
        });
});

exerciseRoutes.route("/addReview").post((req, res) => {
    Exercise.updateOne({_id: req.body.id}, {exercise_completed: true})
        .then()
        .catch(err => console.log(err));
    let review = new Review(req.body.exercise);
    review.save()
        .then(review => {
            res.status(200).json({"review": "Exercise Review Submitted Successfully"});
        })
        .catch(err => {
            res.status(400).json({"errMsg": "Exercise Review Failed to Submit"});
        });
});


module.exports = exerciseRoutes;