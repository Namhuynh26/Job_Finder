const JobModel = require("../models/jobModel");
const Recruiter = require("../models/recruiterModel");


const postJob = async (req, res) => {

    const data = req.body;

    let job = new JobModel({
        recruiter: res.locals.recruiter,
        title: data.title,
        category: data.category,
        description: data.description,
        skills: data.skills,
        type: data.type,
        salary: data.salary,
        amountOfApplicant: data.amountOfApplicant,
        deadline: data.deadline
    });

    job.save().then(() => {
        res.json({message: "Đăng bài thành công"});
        res.redirect("/home");
    }).catch((err) => {
        res.status(400).json(err);
    });
    
};

//Get profile
const getProfile = async(req, res) => {
    recruiter = res.locals.recruiter;
    res.render("pages/profileRecruiter", {recruiter: recruiter});
}

module.exports = {
    postJob,
    getProfile
};