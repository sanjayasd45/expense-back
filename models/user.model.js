const mongoose = require("mongoose");
const Schema = mongoose.Schema





const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    username : String,
    email : {
        type: String,
        required: true
    },
    profile_img: {
        type : String,
    },
    spendingTags : {
        type : Object
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema)

module.exports = User