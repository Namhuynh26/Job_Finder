const RecruiterModel = require("../models/recruiterModel");

const getRecruiterByName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let recruiter = await RecruiterModel.find({nameOfCompany: name});

            if(recruiter){
                console.log(recruiter);
                resolve(recruiter);
            } else {
                resolve(recruiter);
            }
        } catch(e) {
            reject(e);
        }
    });
}

module.exports = {
    getRecruiterByName
};