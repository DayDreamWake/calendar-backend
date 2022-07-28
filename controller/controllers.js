const User = require("../db/userModel");
const Event = require("../db/eventModel");
const Course = require("../db/courseModel");
const bcrypt = require("bcrypt");
const dbConnect = require("../db/dbConnect");
const { default: mongoose } = require("mongoose");
dbConnect();
const async = require('async');

// register endpoint
exports.register = function(request, response, next){
    // hash the password
  bcrypt
  .hash(request.body.password, 10)
  .then((hashedPassword) => {
    // create a new user instance and collect the data
    const user = new User({
      username: request.body.username,
      password: hashedPassword,
    });

    // save the new user
    user
      .save()
      // return success if the new user is added to the database successfully
      .then((result) => {
        response.status(201).send({
          message: "User Created Successfully",
          result,
        });
      })
      // catch error if the new user wasn't added successfully to the database
      .catch((error) => {
        response.status(500).send({
          message: "Error creating user",
          error,
        });
      });
  })
  // catch error if the password hash isn't successful
  .catch((e) => {
    response.status(500).send({
      message: "Password was not hashed successfully",
      e,
    });
  });
}



// login endpoint
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

// add-event endpoint
exports.addEvent = function(req, res, next) {
    const event = new Event({
        name: req.body.name,
        date: req.body.date,
        startTime:req.body.startTime,
        endTime: req.body.endTime,
        description: req.body.description,
        creator: req.body.creator
      });
      event
      .save()
      .then((result)=>{
        res.status(201).send({
          message:"event created successfully",
          result,
        });
      })
      .catch((e)=>{
        res.status(500).send({
          message:"Error creating event",
          e
        });
      })
}
