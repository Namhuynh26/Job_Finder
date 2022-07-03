const Recruiter = require("../models/recruiterModel"); 
const Job = require("../models/jobModel");  

//Show list in home page
const getHome = async (req, res) => {
    Job.find().populate("recruiter").exec((err, job) => {
        if(err) {
            return res.json({error: err});
        }
        res.render("pages/home", {
            jobList: job
        });
    });
}

//Show list recruiter 
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
        res.render("pages/job_listing", {
            jobList: job
        });
    });
}

//Detail job
const getDetail = (req, res) => {
    var id = req.params.id;
    Job.findById({_id: id}).populate("recruiter").exec((err, detail) => {
        if(err) {
            return res.json({error: err});
        }
        console.log(id);
        res.render("pages/job_details", {details: detail});
    });
}

//Searching
const getSearchKey =  (req, res) => {
    const {keyword} = req.query;
    const {select} = req.body;
    console.log(select);
    console.log(keyword);
    Job.find({title: {$regex: keyword, $options: 'i'}, provincecity: select}).populate("recruiter").exec(function(err, job) {
        if(err) {
            message: err;
        } else {
            res.render("pages/searchResult", {jobList: job});
        }
    });
    
}

module.exports = {
    getHome,
    getListRecruiter,
    getList,
    getDetail, 
    getSearchKey
};