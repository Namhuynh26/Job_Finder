let getHome = (req, res) => {
    res.render("pages/home");
};

module.exports = {
    getHome : getHome
};