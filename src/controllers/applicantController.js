const UploadModel = require("../models/uploadModel");
const {searching} = require("../middlewares/index");
const Applicant = require("../models/applicantModel");

//Upload CV
const singleFileUpload = async(req, res, next) => {
    try {
        const file = new UploadModel({
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
    updateApplicant
};