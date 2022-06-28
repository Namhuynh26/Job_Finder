const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recruiter"
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    type: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    amountOfApplicant: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    active: {   
        type: Boolean,
        default: false
    },
    dateOfPost: {
        type: Date,
        default: new Date()
    }
});

function findAllJobPostings() {
    return jobPostingModel.find();
}


function findJobPostingById(jobPostingId) {
    console.log(jobPostingId);
    return jobPostingModel.findById(jobPostingId);
}
function findJobPostingByUserId(userId) {
    console.log(userId);
    return jobPostingModel.find({user:userId});
}

function findJobPostingByLocation(location) {
    return jobPostingModel.findOne({location: location});
}

function findJobPostingByType(type) {
    return jobPostingModel.findOne({type: type});
}

function createJobPosting(jobPosting) {
    console.log(jobPosting);
    return jobPostingModel.create(jobPosting);
}

function deleteJobPosting(jobPostingId) {
    return jobPostingModel.remove({_id: jobPostingId});
}

function updateJobPosting(jobPostingId, newJobPosting) {
    return jobPostingModel.update({_id: jobPostingId},
        {$set: newJobPosting})

}

module.exports = mongoose.model("Jobs", jobSchema);