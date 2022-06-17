const ApplicantModel = require("../models/applicantModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Handle error
const handleError = (err) => {
    console.log(err.message, err.code);


    //Duplicate error
    if(err.code === 11000) {
        error.email = "This email is already registed";
        return error;
    }

}

let maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, "JobFinder secret", {
        expiresIn: maxAge
    });
}


const register = async (req, res) => {
    const {email, password, username, phone} = req.body; 

    try {
        const applicant = await ApplicantModel.create({email, password, username, phone});
        const token = createToken(applicant._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({applicant: applicant._id});    
    }
    catch(err) {
        let errors = handleError(err);
        res.status(400).json({errors});
    }
};


const login = async (req, res) => {
    let {email, password} = req.body;
    
    try {
        const applicant = await ApplicantModel.login(email, password);
        const token = createToken(applicant._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({applicant: applicant._id});  
        
    }
    catch (err){
        let errors = handleError(err);
        res.status(400).json({});
    }
}


module.exports = {
    register,
    login
};
