// const AddSpending = require("../models/addSpendings.model");
const Add = require('../models/add.model')

module.exports.addSpending = async(req, res) => {
    // console.log(req.body.body);
    try {    
        const { email, amount, Tag, name, note, deduction } = req.body.body;
        const data = { email, amount, Tag, name : name.trim(), note, deduction };
        const addition = await Add.create(data); 
        // console.log(addition);
        
        res.status(201).json({ message: "Spending added successfully", addition });
    } catch (error) {
        res.status(500).json({ message: "Error adding amount", error });
    }
}
module.exports.getRecentData = async (req, res) => {

    // console.log("getRecentData",req.body);
    const { email } = req.body.body;
    try {
        const response = await Add.find({ email });
        // console.log("getRecentData",response);
        
        res.status(200).json({ message: "Spending data retrieved successfully", response });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving spending data", error });
    }
};
