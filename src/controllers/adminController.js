const Job = require("../models/jobModel");
const Applicant = require("../models/applicantModel");
const Recruiter = require("../models/recruiterModel");
const { reduce } = require("bluebird");

//Job list 
const getJobAdmin = (req, res) => {
    Job.find().populate("recruiter").exec((err, job) => {
        if(err) {
            return res.json({error: err});
        }
        res.render("adminPage/approvePost", {
            jobList: job
        });
    });
}

//List applicant
const getApplicantAdmin = (req, res) => {
    Applicant.find({}, function(err, applicant) {
        res.render("adminPage/applicantManage", {
            applicantList: applicant
        });
    });
}

//List recruiter
const getRecruitertAdmin = (req, res) => {
    Recruiter.find({}, function(err, recruiter) {
        res.render("adminPage/recruiterManage", {
            recruiterList: recruiter
        });
    });
}

// Approve post
const Approve = async(req, res) => {
    var id = req.params.o99o9o99o9id;
    console.log(id);
    Job.findByIdAndUpdate({_id: id}, {$set: {active : true}}, function(err, job){
        if(err){
            return res.json({error: err});
        }        
        job.save(function(err) {
            if(err) return res.json({error: err});
            res.redirect("/approve");
        });
    });
}



module.exports = {
    getJobAdmin,
    getApplicantAdmin,
    getRecruitertAdmin,
    Approve,
};