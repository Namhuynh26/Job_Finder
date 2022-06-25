const authMiddleware = require("./authMiddleware");
const uploadMiddleware = require("./uploadMiddle");
const searchMiddleware = require("./searchMiddleware");

const authMid = authMiddleware;
const uploadMid = uploadMiddleware;
const searchingMid = searchMiddleware;

module.exports = {
    authMid,
    uploadMid,
    searchingMid
};