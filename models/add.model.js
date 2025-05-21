const mongoose = require("mongoose");
const Schema = mongoose.Schema

const addSchema = new Schema({
    email : {
        type : String,
    },
    amount : {
        type : Number,
        required : true
    },
    Tag : {
        type : String
    },
    name : {
        type : String
    },
    note : {
        type : String,
        // default : "General Expense"
    },
    fileId : {
        type : String,
        default : ""
    },
    deduction : Boolean,
    runningBalance: Number,
}, {timestamps: true});

const Add = mongoose.model("Add", addSchema)

module.exports = Add