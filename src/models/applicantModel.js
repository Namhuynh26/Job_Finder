const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const applicantSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: [true, "Email không được bỏ trống"],
        unique: true,
        trim: true,
        lowcase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email không hợp lệ"]
    },
    password: {
        type: String,
        required: [true, "Mật khẩu không được bỏ trống"],
        minlength: 8
    },
    username: {
        type: String,
        required: [true, "Tên người dùng không được bỏ trống"],
        minlength: 6
    },
    role: {
        type: String,
        default: "applicant"
    },  
    phone: {
        type: String,
        requiredd: [true, "Số điện thoại không được bỏ trống"],
        unique: true
    },
    CV: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload'
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
applicantSchema.statics.login = async function(email, password) {
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