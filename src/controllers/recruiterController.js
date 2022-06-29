const JobModel = require("../models/jobModel");


const postJob = async (req, res) => {
    const {title, category, salary, type, description, skills, amountOfApplicant, deadline} = req.body;

    try {
        if(req.cookies.id == _id){
            const job = await JobModel.create({title, category, salary, type, description, skills, amountOfApplicant, deadline});
            res.redirect("/home");
            res.status(201); 
        }      
    }
    catch(err) {
        let errors = handleError(err);
        res.status(400).json({errors});
    }
    
};

module.exports = {
    postJob
};