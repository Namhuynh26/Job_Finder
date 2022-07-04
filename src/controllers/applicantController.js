const UploadModel = require("../models/uploadModel");
const Applicant = require("../models/applicantModel");

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

//Update applicant
const updateApplicant = async(req, res) => {
    Applicant.findOneAndUpdate({email: req.params.email}, {
        $set: {
            username: req.body.username,
            phone: req.body.phone
        }
    }, (err, result) => {
        if(err) return res.status(500).json({msg: err});
        return res.json({
            msg: "Cập nhật thành công"
        });
    });
};

module.exports = {
    singleFileUpload,
    updateApplicant,
    getCV,
    getProfile
};