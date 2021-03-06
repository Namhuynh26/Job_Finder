const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const recruiterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email không được bỏ trống"],
        unique: true,
        lowcase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email không hợp lệ"]
    },
    password: {
        type: String,
        required: [true,"Mật khẩu không được bỏ trống"],
        minlength: 8
    },
    name: {
        type: String,
        minlength: 6,
        required: [true, "Tên người dùng không được bỏ trống"],
    },
    role: {
        type: String,
        default: "recruiter"
    }, 
    phone: {
        type: String,
        required: [true, "Số điện thoại không được bỏ trống"],
        unique: true
    },
    nameOfCompany: {
        type: String,
        required: [true, "Tên công ty không được bỏ trống"]
    },
    address: {
        type: String,
        required: [true, "Địa chỉ công ty không được bỏ trống"]
    },
    provincecity: {
        type: String,
        required: [true, "Tỉnh/thành phố không được bỏ trống"]
    },
    job: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs"
    }],
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
recruiterSchema.post("save", function(doc, next) {
    console.log("New recruiter has been created & saved", doc);
    next();
});

//Fire a function before doc saved to db
recruiterSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Statics method to login
recruiterSchema.statics.loginRecruiter = async function(email, password) {
    const recruiter = await this.findOne({email});
    if(recruiter){
       const auth = await bcrypt.compare(password, recruiter.password);
       if(auth) {
        return recruiter;
       }
       throw Error("Incorrect password");
    }
    throw Error("Incorrect email");
}

module.exports = mongoose.model("Recruiter", recruiterSchema);