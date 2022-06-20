const ApplicantModel = require("../models/applicantModel");
const jwt = require("jsonwebtoken");

//Handle error
const handleError = (err) => {
    console.log(err.message, err.code);
    let error = {email: "", password: ""};

    //Unregistered account
    if(err.message === "Incorrect email"){
        error.email = "This email hasn't been registed";
    }

    if(err.message === "Incorrect password") {
        error.password = "Password is incorrect";
    }

    //Duplicate error
    if(err.code === 11000) {
        error.email = "This email is already registed";
        return error;
    }

}

const createToken = (id) => {
    return jwt.sign({id}, "JobFinder secret", {
        expiresIn: maxAge
    });
}


const postRegister = async (req, res) => {
    const {email, password, username, phone} = req.body; 

    try {
        const applicant = await ApplicantModel.create({email, password, username, phone});
        const token = createToken(applicant._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge});
        res.redirect("/home");
        res.status(201).json({applicant: applicant._id});    
    }
    catch(err) {
        let errors = handleError(err);
        res.status(400).json({errors});
    }
};


const postLogin = async (req, res) => {
    let {email, password} = req.body;
    
    try {
        const applicant = await ApplicantModel.loginModel(email, password);
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

const getLogout = (req, res) => {
    res.cookie("jwt", "", {maxAge: 1});
    res.redirect("/home");
}


module.exports = {
    postRegister,
    postLogin,
    getLogout
};
