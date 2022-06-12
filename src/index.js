const express = require("express");
const connectDB = require("./config/connectDB");
const configViewEngine = require("./config/viewEngine");
const initRoutes = require("./routes/web");
const bodyParser = require("body-parser");
const connectFlash = require("connect-flash");
const configSession = require("./config/session");

let app = express();


app.use(express.json());

let PORT = 3000;

//Connect to MongoDB
connectDB();

//Config session
configSession(app);

//Config view engine
configViewEngine(app);

//Enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

//Enable flash message
app.use(connectFlash());

//Init routes
initRoutes(app);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});