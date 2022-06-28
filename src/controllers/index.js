const authController = require("./authController");
const homeController = require("./homeController");
const applicantController = require("./applicantController");
const recruiterController = require("./recruiterController");

const auth = authController;
const home = homeController; 
const applicantCtrl = applicantController;
const recruiterCtrl = recruiterController;


module.exports = {
    home,
    auth,
    applicantCtrl,
    recruiterCtrl
};