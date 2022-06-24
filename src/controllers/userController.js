const UploadModel = require("../models/uploadModel");
const {searching} = require("../middlewares/index");

//Upload Cv
const singleFileUpload = async(req, res, next) => {
    try {
        const file = new UploadModel({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormat(req.file.size, 2) //0.00
        });
        await file.save();
        res.status(201).send("File upload thành công");
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

//Searching
let searchRecruiter = async (req, res, next) =>{
    let name = req.params.search;
    
    let recruiter = await searching.getRecruiterByName(name);
    
    return res.render('admin/customer.ejs', {
        recruiter: recruiter
    });
}

module.exports = {
    singleFileUpload
};