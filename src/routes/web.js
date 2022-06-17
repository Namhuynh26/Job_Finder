const express = require("express");
const {home, auth} = require("../controllers/index");


let router = express.Router();

let initRoutes = function(app) {

    router.get("/home", home.getHome);
    
    router.get("/about", function(req, res){
        res.render("pages/about");
    });
    
    router.get("/contact", function(req, res){
        res.render("pages/contact");
    });
    
    router.get("/jobs", function(req, res){
        res.render("pages/job_listing");
    });
    
    router.get("/detail", function(req, res){
        res.render("pages/job_details");
    });
    
    router.get("/login", function(req, res){
        res.render("auth/login");
    });

    router.post("/login", auth.login);
    
    router.get("/login_recruiter", function(req, res){
        res.render("auth/login_recruiter");
    });
    
    router.get("/register", function(req, res){
        res.render("auth/register");
    });
    
    router.get("/register_recruiter", function(req, res){
        res.render("register_recruiter");
    });
    
    router.get("/privacy", function(req, res){
        res.render("pages/privacy");
    });
    
    router.get("/recruiters", function(req, res){
        res.render("pages/recruiter_listing");
    });

    router.post("/register", auth.register);


    return app.use("/", router);
}

module.exports = initRoutes;