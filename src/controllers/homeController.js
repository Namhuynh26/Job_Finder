const Recruiter = require("../models/recruiterModel"); 
const Job = require("../models/jobModel");  
const mongoose = require("mongoose");

//Show list recruiter in home page
const getListRecruiterHome = (req, res) => {
    Recruiter.find({}, function(err, recruiters) {
        res.render("pages/home", {
            recruiterList: recruiters
        });
    });
}
    

const getListRecruiter = (req, res) => {
    Recruiter.find({}, function(err, recruiters) {
        res.render("pages/recruiter_listing", {
            recruiterList: recruiters
        });
    });
}

//Job list
const getList = (req, res) => {
    Job.find().populate("recruiter").exec((err, job) => {
        if(err) {
            return res.json({error: err});
        }
        res.render("pages/job_listing", {jobList: job});
    });
}

//Detail job
const getDetail = (req, res) => {
    var id = req.params.id;
    Job.findById({id: id}).populate("recruiter").exec((err, detail) => {
        if(err) {
            return res.json({error: err});
        }
        res.render("pages/job_details", {detail: detail});
    });
}

module.exports = {
    getListRecruiter,
    getListRecruiterHome,
    getList,
    getDetail
};