const {validationResult} = require("express-validator");
const {auth} = require("../services/index");


let getLogin= (req, res) => {
    return res.render("auth/login", {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};

let postRegister = async (req, res) => {
    let errorArr = [];
    
    let validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });

        req.flash("errors", errorArr);
        return res.redirect("/register");
    }

    await auth.register(req.body.email, req.body.password, req.body.username, req.body.phone);
};


module.exports = {
    getLogin : getLogin,
    postRegister : postRegister
};
