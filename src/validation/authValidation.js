const {check} = require("express-validator");
const {transValidation} = require("./../../lang/vi");

let register = [
  check("email", transValidation.email_incorrect)
    .isEmail()
    .trim(), 
  check("password", transValidation.password_incorrect)
    .isLength({min: 8})
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
  check("password_confirmation", transValidation.password_confirmation_incorrect)
    .custom((value, {req}) => value === req.body.password),
  check("username", transValidation.username)
    .isLength({min: 6}),
  check("phone", transValidation.phone)
    .isLength({max: 10})
    .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/),
];

module.exports = {
  register: register
}