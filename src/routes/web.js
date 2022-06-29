const express = require("express");
const {homeCtrl, authCtrl, applicantCtrl, recruiterCtrl} = require("../controllers/index");
const {authMid} = require("../middlewares/index");
const {upload} = require("../middlewares/uploadMiddle");


let router = express.Router();

let initRoutes = function(app) {

    router.get("*", authMid.checkRecruiter, authMid.checkApplicant);

    router.get("/home", homeCtrl.getListRecruiterHome);
    
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

    router.post("/login", authCtrl.postLogin);
    
    router.get("/login_recruiter", function(req, res){
        res.render("auth/login_recruiter");
    });

    router.post("/login_recruiter", authCtrl.postLogin_Recruiter);
    
    router.get("/register", function(req, res){
        res.render("auth/register");
    });

    router.post("/register", authCtrl.postRegister);
    
    router.get("/register_recruiter", function(req, res){
        res.render("auth/register_recruiter");
    });

    router.post("/register_recruiter", authCtrl.postRegister_Recruiter);
    
    router.get("/privacy", function(req, res){
        res.render("pages/privacy");
    });
    
    router.get("/recruiters", homeCtrl.getListRecruiter);

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

    router.get("/updateApplicant", function(req, res) {
        res.render("pages/updateApplicant");
    });

    router.put("/updateApplicant", applicantCtrl.updateApplicant, authMid.checkApplicant);

    router.get("/postJob", function(req, res) {
        res.render("pages/postJob");
    });

    router.post("/postJob", recruiterCtrl.postJob, authMid.checkRecruiter);

    router.get("/logout", authCtrl.getLogout);


    return app.use("/", router);
}

module.exports = initRoutes;