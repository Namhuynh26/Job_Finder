const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    id: {
        type: String
    },
    keyJob: {
        type: String
    },
    keyRecruiter: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    },
    dateOfPost: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Post", postSchema);