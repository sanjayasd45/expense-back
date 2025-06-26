const ExpressError = require("../helpers/expressError");
// const AddAmount = require("../models/AddAmount.model");
const Add = require('../models/add.model')

module.exports.addAmount = async (req, res) => {
    // console.log(req.body.body);
    // console.log(req.body.body.email);
    try {    
        const { email, amount, Tag, name, note, deduction} = req.body.body;
        // console.log("email", email);
        
        const lastTransaction = await Add.findOne({ email }).sort({ createdAt: -1 });
        // console.log("lastTransaction", lastTransaction);
        

        let previousBalance = lastTransaction ? lastTransaction.runningBalance : 0;
        // console.log("previousBalance", previousBalance);
        
        let newBalance = Number(previousBalance) + (deduction ? -Number(amount) : Number(amount));
        // console.log("newBalance", newBalance);
        
        let = runningBalance = newBalance;
        // console.log("runningBalance", runningBalance);
        const data = { email, amount, Tag, name : name.trim(), note, deduction ,runningBalance};
        // console.log("data",data);

        
        const addition = await Add.create(data); 
        // console.log("addition", addition);
        
        res.status(201).json({ message: "Amount added successfully", addition });
    } catch (error) {
        res.status(500).json({ message: "Error adding amount", error });
    }
};
