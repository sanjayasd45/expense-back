const Add = require('../models/add.model')

module.exports.alltime = async (req, res) => {
    const email = req.body.body 
    console.log("req.body.body",req.body.body);
    try{
        const pipeline = [
            {
              $match: {
                email: email,
              },
            },
            {
              $group: {
                _id: "$Tag",
                sum: {
                  $sum: "$amount",
                },
              },
            },
          ];
          const result = await Add.aggregate(pipeline);
          res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message : "Error filtering data", error})
    }
};
