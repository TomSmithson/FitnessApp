const express = require("express");
const userRoutes = express.Router();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");

userRoutes.use(express.json());
userRoutes.use(express.urlencoded({extended: false}));
userRoutes.use(cookieParser());
userRoutes.use(expressSession({
    secret: "12093890'posdflgk#;'slik9-0=238750-9[u'p",
    resave: true,
    saveUninitialized: true,
}));
userRoutes.use(passport.initialize());
userRoutes.use(passport.session());
userRoutes.use(cors({origin: true, credentials: true}));

passport.use("local", new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, (email, password, next) => {
    User.findOne({
        email: email,
    }, (err, user) => {
        if (err) return console.log(err);
        if (!user || !bcrypt.compareSync(password, user.passwordHash)) return next({message: "Email or Password Incorrect"});
        next(null, user);
    });
}));

passport.use("signup-local", new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, (email, password, next) => {
    User.findOne({
        email: email
    }, (err, user) => {
        if (err) return next(err);
        if (user) return next({message: "User already exists"});
        let newUser = new User({
            email: email,
            passwordHash: bcrypt.hashSync(password, 10)
        });
        newUser.save((err) => {
            next(err, newUser);
        });
    });
}));

passport.serializeUser((user, next) => {
    next(null, user._id);
});

passport.deserializeUser((id, next) => {
    User.findById(id, (err, user) => {
        next(err, user);
    });
});

userRoutes.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return console.log(err);
        if (!user) return console.log("User not found");
        res.send("success");
    })(req, res, next);
})

userRoutes.post("/signup",
    passport.authenticate("signup-local", {failureRedirect: "/user/signup"}), (req, res, next) => {
        console.log("here");
        res.send("Success");
    }
)



module.exports = userRoutes;