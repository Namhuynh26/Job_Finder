const singleFileUpload = async(req, res, next) => {
    try {
        let file = req.file;
        res.status(201).send("File upload thành công");
    }catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    singleFileUpload
};