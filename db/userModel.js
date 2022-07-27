const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    userName: {type: String, required:true, unique: true},
    password: {type: String, required:true, minLength:3},
})

module.exports = mongoose.model("Users", UserSchema);