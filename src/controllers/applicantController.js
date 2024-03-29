const UploadModel = require("../models/uploadModel");
const Applicant = require("../models/applicantModel");
const bcrypt = require("bcryptjs");

//Upload CV
const singleFileUpload = async(req, res, next) => {
    try {
        const file = new UploadModel({
            applicant: res.locals.applicant,
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormat(req.file.size, 2) //0.00
        });
        await file.save();
        res.redirect("/home");
        res.status(201).json("File upload thành công");
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const fileSizeFormat = (bytes, decimal) => {
    if(bytes === 0) {
        return "0 Bytes";
    }

    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + "-" + sizes[index];
}

//Get uploaded CV
const getCV = (req, res) => {
    UploadModel.findOne({}, function(err, CV) {
        res.render("pages/uploadCV", {CV: CV});
    }).sort({$natural:1});
}

//Get profile
const getProfile = async(req, res) => {
    applicant = res.locals.applicant;
    res.render("pages/profile", {applicant: applicant});

}

//Get applicant update
const getApplicant = (req, res) => {
    var id = req.params.id;
    Applicant.findById({_id: id}, function(err, data) {
        res.render("pages/updateApplicant", {id:id, username: data?.username, phone: data?.phone});
    });  
}

//Update applicant
const updateApplicant = async(req, res) => {
    var id = req.params.id;
    try {
        await Applicant.updateOne({_id: id}, {
            $set: {username: req.body.username, phone: req.body.phone}
        });
        console.log(req.body);
        res.redirect("/profile");
    } catch (err){
        console.log("Err", err);
    }
};

//Get update password
const getPassword = (req, res) => {
    var id = req.params.id;
    Applicant.findById({_id: id}, function(err, data) {
        res.render("pages/updatePasswordApplicant", {id: id});
    });  
}

//Update password
const updatePassword = async(req, res) => {
    var id = req.params.id;
    try {
        await Applicant.findOne({_id: id}, function(err, applicant) {
            const auth = bcrypt.compare(req.body.current_password, applicant.password);
            if(!auth){
                return res.send("Mật khẩu hiện tại không đúng");
            }
            applicant.password = req.body.new_password;;
            applicant.save();
            res.redirect("/profile");
        });
    } catch (err) {
        return res.status(400).send(err.message);
    }
    
}

module.exports = {
    singleFileUpload,
    updateApplicant,
    getCV,
    getProfile,
    getApplicant,
    getPassword,
    updatePassword
};