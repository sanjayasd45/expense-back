const mongoose = require("mongoose");
const Schema = mongoose.Schema

const current = new Schema({
    currentUser : {
        type : Object,
    },
}, {timestamps: true});

const CurrentUser = mongoose.model("CurrentUser", current)

module.exports = CurrentUser