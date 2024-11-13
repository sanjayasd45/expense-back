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
                deduction: {
                  $first: "$deduction" 
                }
              },
            },
          ];
          const result = await Add.aggregate(pipeline);
          res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message : "Error filtering data", error})
    }
};
module.exports.today = async (req, res) => {
    const email = req.body.body 
    console.log("req.body.body",req.body.body);
    try{
        const pipeline = [
          {
            $match: {
              email: email,
              createdAt: {
                $gte: new Date(
                  new Date().setHours(0, 0, 0, 0)
                ),
                $lt: new Date(
                  new Date().setHours(24, 0, 0, 0)
                ),
              },
            },
          },
          {
            $group: {
              _id: "$Tag",
              sum: {
                $sum: "$amount",
              },
              deduction: {
                $first: "$deduction",
              }
            },
          },
          ];
          const result = await Add.aggregate(pipeline);
          res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message : "Error filtering data", error})
    }
};
module.exports.fromRange = async (req, res) => {
    const {email, duration} = req.body.body 
    console.log("req.body.body",req.body.body);
    try{
        const pipeline = [
          {
            $match: {
              email: email,
              createdAt : {
                 $gte: new Date(new Date().setDate(new Date().getDate() - duration))
              }
            },
          },
          {
            $group: {
              _id: "$Tag",
              sum: {
                $sum: "$amount",
              },
              deduction : {
                $first : "$deduction"
              }
            },
          },
          ];
          const result = await Add.aggregate(pipeline);
          res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message : "Error filtering data", error})
    }
};
