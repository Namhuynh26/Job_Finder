const authController = require("./authController");
const homeController = require("./homeController");
const userController = require("./userController");

const auth = authController;
const home = homeController; 
const user = userController;

module.exports = {
    home,
    auth,
    user
};