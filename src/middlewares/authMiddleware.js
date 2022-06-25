const jwt = require("jsonwebtoken");
const Recruiter = require("../models/recruiterModel");
const Applicant = require("../models/applicantModel");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check json web token exists & is verified
    if(token) {
        jwt.verify(token, "JobFinder secret", (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect("/login");
            }
            else {
                console.log(decodedToken);
                next();
            }
        });
    }
    else {
        res.redirect("/login");
    }
    
}

//Check current applicant
const checkApplicant = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, "JobFinder secret", async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.applicant = null;
                next();
            }
            else {
                console.log(decodedToken);
                let applicant = await Applicant.findById(decodedToken.id);
                res.locals.applicant = applicant;
                next();
            }
        });
    }
    else {
        res.locals.applicant = null;
        next();
    }
}

//Check current recruiter
const checkRecruiter = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, "JobFinder secret", async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.recruiter = null;
                next();
            }
            else {
                console.log(decodedToken);
                let recruiter = await Recruiter.findById(decodedToken.id);
                res.locals.recruiter = recruiter;
                next();
            }
        });
    }
    else {
        res.locals.recruiter = null;
        next();
    }
}

module.exports = {
    requireAuth,
    checkApplicant,
    checkRecruiter
};