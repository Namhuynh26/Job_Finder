const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const applicantSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        lowcase: true,
    },
    password: {
        type: String,
        require: true,
        minlength: 8
    },
    username: {
        type: String,
        minlength: 6
    },
    token: {
        type: String
    },
    role: {
        type: String,
        default: "applicant"
    },  
    phone: {
        type: String,
        require: true,
        unique: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: null
    },
    deleteAt: {
        type: Date,
        default: null
    },

});

//Fire a function after doc saved to db
applicantSchema.post("save", function(doc, next) {
    console.log("New applicant has been created & saved", doc);
    next();
});

//Fire a function before doc saved to db
applicantSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Statics method to login
applicantSchema.statics.loginModel = async function(email, password) {
    const applicant = await this.findOne({email});
    if(applicant){
       const auth = await bcrypt.compare(password, applicant.password);
       if(auth) {
        return applicant;
       }
       throw Error("Incorrect password");
    }
    throw Error("Incorrect email");
}

module.exports = mongoose.model("Applicant", applicantSchema);