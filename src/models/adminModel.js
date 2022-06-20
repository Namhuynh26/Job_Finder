const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        minLength: 8
    },
    password: {
        type: String,
        minLength: 8
    }
});

module.exports = mongoose.model("Admin", adminSchema);