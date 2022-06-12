const session = require("express-session");
const connectMongo = require("connect-mongo");

let MongoStore = new connectMongo(session);

let sessionStore = new MongoStore({
    url: "mongodb://localhost:27017/JobFinder",
    autoReconnect: true,
    //autoRemove: "native"
});

let configSession = (app) => {
    app.use(session({
        key: "express.sid",
        secret: "mySecret",
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 //1 day
        }
    }))
};  

module.exports = configSession;