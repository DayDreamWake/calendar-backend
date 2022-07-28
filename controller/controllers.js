const User = require("../db/userModel");
const Event = require("../db/eventModel");
const Course = require("../db/courseModel");
const bcrypt = require("bcrypt");
const dbConnect = require("../db/dbConnect");
const { default: mongoose } = require("mongoose");
dbConnect();
const async = require('async');

exports.login = async function (req, res, next) {
    try {
        // find a user with {req.body.username}
        const user = await User.findOne({ username: req.body.username });
        if (!user.ok) {
            // user not found
        }
        const verify = await bcrypt
            .compare(req.body.password, user.password);
        if (!verify.ok) {
            // password check failed
        } else if (!verify){
            // password not match
        }
        const events = await Event.find({
            creator: user._id
        })
        if (!events.ok) {
            // events not found
        }
        res.status(200).send({
            message: "Login successful",
            user: user,
            events: events,
        })

    }
    catch(error){
        return next(error);
    }
}
