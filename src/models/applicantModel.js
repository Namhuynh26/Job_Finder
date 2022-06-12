const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
    },
    gender: {
        type: String,
        default: "male"
    },
    local: {
        email: {
            type: String,
            unique: true,
            trim: true
        },
        password: String,
        isActive: {
            type: Boolean,
            default: false
        },
        verifyToken: String
    },
    role: {
        type: String,
        default: "applicant"
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return v !== "" ? /\+\d{1,3}\d{10}/.test(v) : true;
            },
            msg: "Phone number is invalid!"
        },
    },
    address: {
        type: String
    },
    createAt: {
        type: Number,
        default: Date.now
    },
    updateAt: {
        type: Number,
        default: null
    },
    deleteAt: {
        type: Number,
        default: null
    },

});

applicantSchema.statics = {
    createNew(item){
        return this.create(item);
    },

    findByEmail(email) {
        return this.findOne({"local.email": email}).exec();
    }
};

module.exports = mongoose.model("Applicant", applicantSchema);