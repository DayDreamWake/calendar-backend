const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    userName: {type: String, required:true, minLength: 3, maxLength:3, unique: true},
    password: {type: String, required:true, minLength:5, maxLength:16},
})

module.exports = mongoose.model("Users", UserSchema);