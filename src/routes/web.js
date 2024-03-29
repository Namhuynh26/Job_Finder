const express = require("express");
const {homeCtrl, authCtrl, applicantCtrl, recruiterCtrl, adminCtrl} = require("../controllers/index");
const {authMid} = require("../middlewares/index");
const {upload} = require("../middlewares/uploadMiddle");


let router = express.Router();

let initRoutes = function(app) {

    router.get("*", authMid.checkRecruiter, authMid.checkApplicant);

    router.get("/home", homeCtrl.getHome);
    
    router.get("/about", function(req, res){
        res.render("pages/about");
    });
    
    router.get("/contact", function(req, res){
        res.render("pages/contact");
    });
    
    router.get("/jobs", homeCtrl.getList);
    
    router.get("/detail/:id", homeCtrl.getDetail);
    
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

    router.get("/uploadCV", authMid.requireAuth, applicantCtrl.getCV);

    router.post("/uploadCV", upload.single("CV"), authMid.checkApplicant, applicantCtrl.singleFileUpload);

    router.get("/admin", function(req, res) {
        res.render("adminPage/index");
    });

    router.get("/approve", adminCtrl.getJobAdmin);
    router.post("/approve/:id", adminCtrl.Approve);
    router.get("/applicant", adminCtrl.getApplicantAdmin);
    router.get("/recruiter", adminCtrl.getRecruitertAdmin);
    router.get("/login_admin", function(req, res) {
        res.render("adminPage/login");
    });
    router.post("/login_admin", authCtrl.postLogin_Admin);

    router.get("/listJob", function(req, res) {
        res.render("adminPage/listJob");
    });

    router.get("/profile", authMid.checkApplicant, applicantCtrl.getProfile);

    router.get("/profile_recruiter", authMid.checkRecruiter, recruiterCtrl.getProfile);

    router.get("/updateApplicant/:id", applicantCtrl.getApplicant);
    router.post("/updateApplicant/:id", applicantCtrl.updateApplicant, authMid.checkApplicant);

    router.get("/updateRecruiter/:id", recruiterCtrl.getRecruiter);
    router.post("/updateRecruiter/:id", recruiterCtrl.updateRecruiter, authMid.checkRecruiter);

    router.get("/update_password/:id", applicantCtrl.getPassword);
    router.post("/update_password/:id", applicantCtrl.updatePassword);

    router.get("/postJob", function(req, res) {
        res.render("pages/postJob");
    });

    router.post("/postJob", authMid.checkRecruiter, recruiterCtrl.postJob);

    router.get("/logout", authCtrl.getLogout);

    router.get("/logoutAdmin", authCtrl.getLogoutAdmin);

    router.get("/search", homeCtrl.getSearchKey);
    

    return app.use("/", router);
}

module.exports = initRoutes;