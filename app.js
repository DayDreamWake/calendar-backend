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

module.exports = app;