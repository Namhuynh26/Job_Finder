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

    if(err){
        throw err;
    } else {
        return mongoose.connect(URI, {useNewUrlParser: true});
    }
}

module.exports = connectDB;