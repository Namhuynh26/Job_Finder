const JobModel = require("../models/jobModel");
const RecruiterModel = require("../models/recruiterModel");

const postJob = async (req, res) => {
    const {title, salary, type, description, amountOfApplicant, deadline} = req.body;
    
    try {
        const job = await JobModel.create({title, salary, type, description, amountOfApplicant, deadline});
        res.redirect("/home");
        res.status(201);    
    }
    catch(err) {
        let errors = handleError(err);
        res.status(400).json({errors});
    }
    
}