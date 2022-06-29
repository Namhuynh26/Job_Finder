const authController = require("./authController");
const homeController = require("./homeController");
const applicantController = require("./applicantController");
const recruiterController = require("./recruiterController");

const authCtrl = authController;
const homeCtrl = homeController; 
const applicantCtrl = applicantController;
const recruiterCtrl = recruiterController;


module.exports = {
    homeCtrl,
    authCtrl,
    applicantCtrl,
    recruiterCtrl
};