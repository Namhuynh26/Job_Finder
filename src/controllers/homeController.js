const Recruiter = require("../models/recruiterModel"); 

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

module.exports = {
    getListRecruiter,
    getListRecruiterHome
};