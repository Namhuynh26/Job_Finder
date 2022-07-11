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

//Get recruiter update
const getRecruiter = (req, res) => {
    var id = req.params.id;
    Recruiter.findById({_id: id}, function(err, data) {
        res.render("pages/updateRecruiter", {
            id:id, 
            name: data?.name, 
            phone: data?.phone, 
            nameOfCompany: data?.nameOfCompany, 
            address: data?.address
        });
    });
}

//Update applicant
const updateRecruiter = async(req, res) => {
    var id = req.params.id;
    await Recruiter.updateOne({_id: id}, {
        $set: {
            name: req.body.name, 
            phone: req.body.phone, 
            nameOfCompany: req.body.nameOfCompany,
            address: req.body.address
        }
    });
    console.log(req.body);
    res.redirect("/profile_recruiter");
};

module.exports = {
    postJob,
    getProfile,
    getRecruiter,
    updateRecruiter
};