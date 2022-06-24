const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    typeOfPost: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    remainDate: {
        type: Date
    }
});

module.exports = mongoose.model("Post", postSchema);