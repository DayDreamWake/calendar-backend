// external imports
const mongoose = require("mongoose");
require('dotenv').config()

async function dbConnect() {
    mongoose.connect(
        process.env.DB_URL,
        {
          //   these are options to ensure that the connection is done properly
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
    )
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((error) => {
        console.log("Unable to connect");
        console.error(error);
    })
}

module.exports = dbConnect;