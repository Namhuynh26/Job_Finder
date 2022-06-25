const Recruiter = require("../models/recruiterModel"); 

const getListRecruiter = (req, res) => {
    Recruiter.find({}, function(err, list) {
        res.render("pages/recruiter_listing", {
            recruiterList: list
        });
    });
}

module.exports = {
    getListRecruiter
};