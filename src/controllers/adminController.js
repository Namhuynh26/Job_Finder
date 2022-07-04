const Job = require("../models/jobModel");
const Applicant = require("../models/applicantModel");
const Recruiter = require("../models/recruiterModel");

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
const putApprove = async(req, res) => {
    var id = req.params.id;
    Job.findByIdAndUpdate({_id: id}, {$set: {active: !active}}).populate("recruiter").exec((err, job) => {
        if(err) {
            return res.json({error: err});
        }   
        console.log(id);
    });
}



module.exports = {
    getJobAdmin,
    getApplicantAdmin,
    getRecruitertAdmin,
    postApprove,
};