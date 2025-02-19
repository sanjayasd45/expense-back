const ExpressError = require("../helpers/expressError");
// const AddAmount = require("../models/AddAmount.model");
const Add = require('../models/add.model')

module.exports.addAmount = async (req, res) => {
    console.log(req.body.body);
    try {    
        const { email, amount, Tag, name, note, deduction} = req.body.body;
        const data = { email, amount, Tag, name : name.trim(), note, deduction };
        // console.log("data",data);

        
        const addition = await Add.create(data); 
        // console.log("addition", addition);
        
        res.status(201).json({ message: "Amount added successfully", addition });
    } catch (error) {
        res.status(500).json({ message: "Error adding amount", error });
    }
};
