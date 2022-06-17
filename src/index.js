const express = require("express");
const connectDB = require("./config/connectDB");
const configViewEngine = require("./config/viewEngine");
const initRoutes = require("./routes/web");
const bodyParser = require("body-parser");
const configSession = require("./config/session");
const cookiesParser = require("cookie-parser");

let app = express();


app.use(express.json());
app.use(cookiesParser());

let PORT = 3000;

//Connect to MongoDB
connectDB();

//Config session
configSession(app);

//Config view engine
configViewEngine(app);

//Enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

//Init routes
initRoutes(app);

//cookies
app.get("/set-cookies", (req, res) => {
    //res.setHeader("Set-Cookie", "newApplicant=true");
    res.cookie("newApplicant", false);
    res.send("You got the cookies");
});

app.get("/read-cookies", (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);

    res.json(cookies);
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});