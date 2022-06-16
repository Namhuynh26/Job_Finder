const mongoose = require("mongoose");
const bluebird = require("bluebird");

//Connect to MongoDB
let connectDB = (err) => {
    mongoose.Promise = bluebird;

    let DB_CONNECTION = "mongodb";
    let DB_HOST = "localhost";
    let DB_PORT = 27017;
    let DB_NAME = "JobFinder";
    let DB_USERNAME = "";
    let DB_PASSWORD = "";
    //mongodb://localhost:27017/JobFinder
    let URI = `${DB_CONNECTION}://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

    try {
        return mongoose.connect(URI, {useNewUrlParser: true});
    } catch(err) {
        console.log("Connecting fail by err", err);
        process.exit(1);
    }
}

module.exports = connectDB;