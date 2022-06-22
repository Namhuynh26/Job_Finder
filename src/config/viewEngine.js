const express = require("express");

const ConfigViewEngine = function(app) {

    app.set("view engine", "ejs");

    app.use(express.static("public"));

};

module.exports = ConfigViewEngine;