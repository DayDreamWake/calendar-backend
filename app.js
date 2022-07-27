const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
// require database connection 
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");

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
  response.json({ message: "Hey! This is your Calendar!" });
  next();
});

// register endpoint
app.post("/register", (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      user
        .save()
        .then((result)=> {
          res.status(201).send({
            message:"User created successfully",
            result,
          });
        })
        .catch((error)=>{
          res.status(500).send({
            message:"Error creating user",
            error,
          });
        });
    })
    .catch((error)=>{
      res.status(500).send({
        message: "Password failed hashing",
        error,
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

module.exports = app;