const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
// require database connection 
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const Event = require("./db/eventModel");
const Course = require("./db/courseModel");
const { default: mongoose } = require("mongoose");

// execute database connection 
dbConnect();


// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Homepage get endpoint
app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your fucking Calendar!" });
  next();
});

// register endpoint
app.post("/register", (request, response) => {
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
});

// login endpoint
app.post("/login", (req,res,next) => {
  // find a user with {req.body.username}
  User.findOne({username: req.body.username})
  // if found
  .then((user)=>{
    // compare passwords
    bcrypt
    .compare(req.body.password, user.password)
    .then((check)=>{
      // password does not match
      if(!check){
        return res.status(500).send({
          message: "Password not match",
          error,
        })
      }
       // password matches
      res.status(200).send({
        message: "Login successful",
        user: user,
      })

    })
    .catch((error)=>{
      res.status(500).send({
        message: "Password check failed",
        error
      })
    })
  })
  .catch((error)=>{
    res.status(500).send({
      message:"User not found",
      error,
    })
  });
});

// addEvent endpoint
app.post("/add-event", (req, res)=>{
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
})

// event endpoint
app.get("/events", (req, res)=>{
  Event.find({'creator':req.body._id})
  .then((result)=>{
    res.status(201).send({
      message:"Events fetch successful",
      result,
    });
  })
  .catch((e)=>{
    res.status(500).send({
      message:"Error fetching events",
      e
    });
  })
})

// add-course endpoint
app.post("/add-course", (req, res)=>{
  const course = new Course({
    name: req.body.name,
    daysInAWeek: req.body.daysInAWeek,
    timeInAWeek: req.body.timeInAWeek,
    startDate:req.body.startDate,
    endDate: req.body.endDate,
    creator: req.body.creator,
  });
  course
  .save()
  .then((result)=>{
    res.status(201).send({
      message:"Course created successfully",
      result,
    });
  })
  .catch((e)=>{
    res.status(500).send({
      message:"Error creating course",
      e
    });
  })
})

// event endpoint
app.get("/courses", (req, res)=>{
  Course.find({'creator':req.body._id})
  .then((result)=>{
    res.status(201).send({
      message:"Courses fetch successful",
      result,
    });
  })
  .catch((e)=>{
    res.status(500).send({
      message:"Error fetching courses",
      e
    });
  })
})




module.exports = app;