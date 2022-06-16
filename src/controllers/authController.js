const ApplicantModel = require("../models/applicantModel");
const { validationResult } = require("express-validator");


register_get = (req, res) => {
    res.render("register");
}

register_post = async (req, res) => {
    const {email, password, username, phone} = req.body; 

    try {
        const applicant = await ApplicantModel.create({email, password, username, phone});
        res.status(201).json(applicant);    
    }
    catch(err) {
        
        res.status(400).send("Error, cannot create account");
    }
}

login_get = (req, res) => {
    res.render("login");
}

login_post = (req, res) => {
    const {email, password} = req.body; 
    console.log(email, password);
    res.send("user login");
}


module.exports = {
    register_get,
    register_post,
    login_get,
    login_post
};
