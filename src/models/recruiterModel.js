const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        lowcase: true,
    },
    password: {
        type: String,
        require: true,
        minlength: 8
    },
    isActive: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        minlength: 6
    },
    role: {
        type: String,
        default: "recruiter"
    }, 
    phone: {
        type: String,
        require: true,
        unique: true
    },
    nameOfCompany: {
        type: String
    },
    address: {
        type: String
    }
});

module.exports = mongoose.model("Recruiter", recruiterSchema);