const express = require("express");
const {homeCtrl, authCtrl, applicantCtrl, recruiterCtrl} = require("../controllers/index");
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

    router.get("/uploadCV", authMid.requireAuth, function(req, res) {
        res.render("pages/uploadCV");
    });

    router.post("/uploadCV", upload.single("CV"), applicantCtrl.singleFileUpload);

    router.get("/admin", function(req, res) {
        res.render("partials/adminLayout");
    });

    router.get("/listJob", function(req, res) {
        res.render("adminPage/listJob");
    });

    router.get("/profile", authMid.checkApplicant, function(req, res){
        var {email, username, phone} = req.params;
        res.render("pages/profile", {email: email, username: username, phone: phone});
    });

    router.put("/updateApplicant", applicantCtrl.updateApplicant, authMid.checkApplicant);

    router.get("/postJob", function(req, res) {
        res.render("pages/postJob");
    });

    router.post("/postJob", authMid.checkRecruiter, recruiterCtrl.postJob);

    router.get("/logout", authCtrl.getLogout);

    router.get("/search", homeCtrl.getSearchKey);
    

    return app.use("/", router);
}

module.exports = initRoutes;