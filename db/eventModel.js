const mongoose = require("mongoose");
const EventSchema = mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    startTime:{type: String, required: true},
    endTime: {type: String, required: true},
    description: {type: String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref:"Users", required: true}
})

module.exports = mongoose.model("Event", EventSchema);