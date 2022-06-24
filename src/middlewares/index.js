const authMiddleware = require("./authMiddleware");
const uploadMiddleware = require("./uploadMiddle");
const searchMiddleware = require("./searchMiddleware");

const auth = authMiddleware;
const upload = uploadMiddleware;
const searching = searchMiddleware;

module.exports = {
    auth,
    upload,
    searching
};