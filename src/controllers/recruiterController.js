const JobModel = require("../models/jobModel");


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

module.exports = {
    postJob
};