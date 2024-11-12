const mongoose = require("mongoose");
const Schema = mongoose.Schema





const addSpendingsSchema = new Schema({
    email : {
        type : String,
    },
    amount : {
        type : Number,
        required : true
    },
    spendingTag : {
        type : String,
        required : true
    },
    name : {
        type : String
    },
    note : {
        type : String,
        default : "General Expense"
    }
}, {timestamps: true});

const AddSpending = mongoose.model("AddSpending", addSpendingsSchema)

module.exports = AddSpending