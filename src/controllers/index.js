const authController = require("./authController");
const homeController = require("./homeController");
const applicantController = require("./applicantController");
const recruiterController = require("./recruiterController");
const adminController = require("./adminController");

const authCtrl = authController;
const homeCtrl = homeController; 
const applicantCtrl = applicantController;
const recruiterCtrl = recruiterController;
const adminCtrl = adminController;


module.exports = {
    homeCtrl,
    authCtrl,
    applicantCtrl,
    recruiterCtrl,
    adminCtrl
};