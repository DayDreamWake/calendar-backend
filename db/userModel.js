const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    username: {type: String, required:true, minLength: 3, unique: true},
    password: {type: String, required:true, minLength:3},
})

module.exports = mongoose.model("Users", UserSchema);