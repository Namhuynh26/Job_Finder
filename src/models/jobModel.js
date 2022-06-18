const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true,
    },
    recruiterName: {
        type: String,
    },
    recruiterEmail: {
        type: String,
    },
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
    duration: {
        type: Number,
        required: true
    },
    salary: {
        type: Number
    },
    amountOfApplicant: {
        type: Number
    },
    address: {
        type: String,
        required: true
    },
    dateOfPost: {
        type: Date,
        default: new Date()
    },
    deadline: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model("Job", jobSchema);