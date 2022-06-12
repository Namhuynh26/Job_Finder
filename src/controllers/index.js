const authController = require("./authController");
const homeController = require("./homeController");

const auth = authController;
const home = homeController; 

module.exports = {
    home,
    auth
};