const ApplicantModel = require("../models/applicantModel");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const { reject } = require("bluebird");
const { transError } = require("../../lang/vi");

let saltRounds = 8;

let register = (email, password, username, phone) => {
    return new Promise(async (resolve, reject) => {
        let applicantByEmail = await ApplicantModel.findByEmail(email); 
        if(applicantByEmail) {
            return reject(transError.account_in_use);
        }
        
        let salt = bcrypt.genSaltSync(saltRounds);

        let applicantItem = {
            username: username,
            phone: phone,
            local: {
                email: email,
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuid()
            }
        };

        let applicant  = await ApplicantModel.createNew(applicantItem);
        resolve(applicant);
    });
};

module.exports = {
    register : register
};