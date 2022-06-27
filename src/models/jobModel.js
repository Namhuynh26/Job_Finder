const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    salary: {
        type: Number
    },
    amountOfApplicant: {
        type: Number
    },
    deadline: {
        type: Date,
        required: true
    },
    browse: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Job", jobSchema);