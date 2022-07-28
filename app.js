const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
// require database connection 
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const Event = require("./db/eventModel");
const Course = require("./db/courseModel");
const controller = require("./controller/controllers");
const { default: mongoose } = require("mongoose");

// execute database connection 
//dbConnect();


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
app.post("/register", controller.register);

// login endpoint
app.post("/login", controller.login);

// addEvent endpoint
app.post("/add-event", controller.addEvent);

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

// delete-event endpoint
app.post("/delete-event", controller.deleteEvent);

// edit-event endpoint
app.post("/edit-event", controller.editEvent);

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