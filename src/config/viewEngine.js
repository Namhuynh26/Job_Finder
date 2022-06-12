const express = require("express");

let ConfigViewEngine = function(app) {

    app.set("view engine", "ejs");

    app.use(express.static('public'))

};

module.exports = ConfigViewEngine;