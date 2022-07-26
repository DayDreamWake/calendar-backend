const mongoose = require("mongoose");
const EventSchema = mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    startTime:{type: Date, required: true},
    endTime: {type: Date, required: true},
    description: {type: String},
    creator: {type: Schema.Types.ObjectId, ref:"Users", required: true}
})

module.exports = mongoose.model("Event", EventSchema);