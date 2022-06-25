const ApplicantModel = require("../models/applicantModel");
const RecruiterModel = require("../models/recruiterModel");
const jwt = require("jsonwebtoken");

//Handle error
const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = {email: "", password: ""};

    //Unregistered account
    if(err.message === "Incorrect email"){
        errors.email = "This email hasn't been registed";
    }

    if(err.message === "Incorrect password") {
        errors.password = "This password hasn't been registed";
    }

    //Duplicate error
    if(err.code === 11000) {
        errors.email = "This email is already registed";
        return errors;
    }

    //Validation errors
    if(err.message.include("Applicant validation failed") || err.message.include("Recruiter validation failed")){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

}

const createToken = (id) => {
    return jwt.sign({id}, "JobFinder secret");
}

//Applicant register
const postRegister = async (req, res) => {
    const {email, password, username, phone} = req.body; 

    try {
        const applicant = await ApplicantModel.create({email, password, username, phone});
        res.redirect("/home");
        res.status(201);    
    }
    catch(err) {
        let errors = handleError(err);
        res.status(400).json({errors});
    }
};

//Applicant login
const postLogin = async (req, res) => {
    let {email, password} = req.body;
    
    try {
        const applicant = await ApplicantModel.login(email, password);
        const token = createToken(applicant._id);
        res.cookie("jwt", token, {httpOnly: true});
        res.redirect("/home");
        res.status(200).json({applicant: applicant._id});  
    }
    catch (err){
        let errors = handleError(err);
        res.status(400).json({errors});
    }
}

//Recruiter register
const postRegister_Recruiter = async (req, res) => {
    const {email, password, name, phone, nameOfCompany, address, provincecity} = req.body; 

    try {
        const recruiter = await RecruiterModel.create({email, password, name, phone, nameOfCompany, address, provincecity});
        res.redirect("/home");
        res.status(201);    
    }
    catch(err) {
        let errors = handleError(err);
        res.status(400).json({errors});
    }
};

//Recruiter login
const postLogin_Recruiter = async (req, res) => {
    let {email, password} = req.body;
    
    try {
        const recruiter = await RecruiterModel.loginRecruiter(email, password);
        const token = createToken(recruiter._id);
        res.cookie("jwt", token, {httpOnly: true});
        res.redirect("/home");
        res.status(200).json({recruiter: recruiter._id});  
    }
    catch (err){
        let errors = handleError(err);
        res.status(400).json({errors});
    }
}

const getLogout = (req, res) => {
    res.cookie("jwt", "");
    res.redirect("/home");
}


module.exports = {
    postRegister,
    postLogin,
    postRegister_Recruiter,
    postLogin_Recruiter,
    getLogout
};
