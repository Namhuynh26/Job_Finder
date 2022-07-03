const authMiddleware = require("./authMiddleware");
const uploadMiddleware = require("./uploadMiddle");

const authMid = authMiddleware;
const uploadMid = uploadMiddleware;

module.exports = {
    authMid,
    uploadMid
};