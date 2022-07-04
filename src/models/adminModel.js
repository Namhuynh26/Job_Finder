const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        minLength: 8
    },
    password: {
        type: String,
        minLength: 8
    }
});

adminSchema.statics.loginAdmin = async function(username, password) {
    const admin = await this.findOne({username});
    if(admin){
       const auth = await bcrypt.compare(password, admin.password);
       if(auth) {
        return admin;
       }
       throw Error("Incorrect password");
    }
    throw Error("Incorrect username");
}

module.exports = mongoose.model("Admin", adminSchema);