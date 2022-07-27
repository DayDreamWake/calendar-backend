const mongoose = require("mongoose");
const CourseSchema = mongoose.Schema({
    name: {type: String, required: true},
    daysInAWeek: [{type: Number, required: true}],
    timeInAWeek: [{type: Number, required: true}],
    startDate:{type: Date, required: true},
    endDate: {type: Date, required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref:"Users", required: true}
})

module.exports = mongoose.model("Course", CourseSchema);