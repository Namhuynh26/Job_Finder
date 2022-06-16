const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
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
    username: {
        type: String,
        minlength: 6
    },
    role: {
        type: String,
        default: "applicant"
    },
    phone: {
        type: String,
        /**
         * validate: {
            validator: function(v) {
                return v !== "" ? /\+\d{1,3}\d{10}/.test(v) : true;
            },
            msg: "Phone number is invalid!"
        },
         */
    },
    createAt: {
        type: Number,
        default: Date.now
    },
    updateAt: {
        type: Number,
        default: null
    },
    deleteAt: {
        type: Number,
        default: null
    },

});

module.exports = mongoose.model("Applicant", applicantSchema);