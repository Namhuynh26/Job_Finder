const express = require("express");
const {home, auth, applicantCtrl, recruiterCtrl} = require("../controllers/index");
const {authMid} = require("../middlewares/index");
const {upload} = require("../middlewares/uploadMiddle");


let router = express.Router();

let initRoutes = function(app) {

    router.get("*", authMid.checkRecruiter, authMid.checkApplicant);

    router.get("/home", home.getListRecruiterHome);
    
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
        let alert = req.errors;
        res.render("auth/login", {alert});
    });

    router.post("/login", auth.postLogin);
    
    router.get("/login_recruiter", function(req, res){
        res.render("auth/login_recruiter");
    });

    router.post("/login_recruiter", auth.postLogin_Recruiter);
    
    router.get("/register", function(req, res){
        res.render("auth/register");
    });

    router.post("/register", auth.postRegister);
    
    router.get("/register_recruiter", function(req, res){
        res.render("auth/register_recruiter");
    });

    router.post("/register_recruiter", auth.postRegister_Recruiter);
    
    router.get("/privacy", function(req, res){
        res.render("pages/privacy");
    });
    
    router.get("/recruiters", home.getListRecruiter);

    router.get("/uploadCV", authMid.requireAuth, function(req, res) {
        res.render("pages/uploadCV");
    });

    router.post("/uploadCV", upload.single("CV"), applicantCtrl.singleFileUpload);

    router.get("/admin", function(req, res) {
        res.render("partials/adminLayout");
    });

    router.get("/jobList", function(req, res) {
        res.render("adminPage/jobList");
    });

    router.get("/postJob", function(req, res) {
        res.render("pages/postJob");
    });

    router.post("/postJob", recruiterCtrl.postJob, authMid.checkRecruiter);

    router.get("/logout", auth.getLogout);


    return app.use("/", router);
}

module.exports = initRoutes;