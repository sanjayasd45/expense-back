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
    const { email, page, limit } = req.body.body;
    const page1  = Number(page) || 1;
    const limit1 = Number(limit) || 10; 
    
    try {
        const skip = (page1 - 1) * limit1;
        console.log(skip);
        
        const result = await Add.aggregate([
            { $match: { email } },
            { $sort: { createdAt: -1 } }, // Sort by most recent first
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: limit1 }],
                    totalCount: [{ $count: "count" }]
                }
            }
        ]);
        console.log("data", result);

        const data = result[0].data;
        const totalDocs = result[0].totalCount[0]?.count || 0;
        const totalPages = Math.ceil(totalDocs / limit);

        console.log("totalDocs", totalDocs );
        

        return res.json({ data, totalDocs, totalPages, currentPage: page, limit });
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving spending data", error });
    }
};
