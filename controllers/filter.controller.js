const Add = require("../models/add.model");

module.exports.alltime = async (req, res) => {
  const email = req.body.body;
  // console.log("req.body.body",req.body.body);
  try {
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
            $first: "$deduction",
          },
        },
      },
    ];
    const result = await Add.aggregate(pipeline);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error filtering data", error });
  }
};
module.exports.today = async (req, res) => {
  const email = req.body.body;
  console.log("req.body.body", req.body.body);
  try {
    const pipeline = [
      {
        $match: {
          email: email,
          createdAt: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            $lt: new Date(new Date().setHours(24, 0, 0, 0)),
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
          },
        },
      },
    ];
    const result = await Add.aggregate(pipeline);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error filtering data", error });
  }
};
module.exports.fromRange = async (req, res) => {
  const { email, duration } = req.body.body;
  console.log("req.body.body", req.body.body);
  try {
    const pipeline = [
      {
        $match: {
          email: email,
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - duration)),
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
          },
        },
      },
    ];
    const result = await Add.aggregate(pipeline);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error filtering data", error });
  }
};
module.exports.dateRange = async (req, res) => {
  const { isChecked, startDate, endDate , email} = req.body.body;
  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Both startDate and endDate are required" });
  }
  const start = new Date(startDate);
  let end = new Date(endDate);
  end.setUTCHours(23, 59, 59, 999); 
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }
  if(isChecked){
      try {
        console.log(`Start Date: ${start}, End Date: ${end}`);
        const data = await Add.find({
          email,
          createdAt: {
            $gte: start,
            $lte: end,
          },
        });
        res.status(200).json({ data });
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "An error occurred while fetching data" });
      }
  }else{
      try {
        const pipeline = [
          {
            $match: {
              email: email,
              createdAt: {
                $gte: new Date(start), 
                $lte: new Date(end)    
              }
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
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ message: "Error filtering data", error });
      }
  } 
};
module.exports.searchUdhari = async(req, res) => {
  const {startDate, endDate, email} = req.body.body
  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Both startDate and endDate are required" });
  }
  const start = new Date(startDate);
  let end = new Date(endDate);
      end.setUTCHours(23, 59, 59, 999); 

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }
  
  try{
    const pipeline = [
      {
        $match: {
          email: email,
          createdAt: {
            $gte: new Date(start), 
            $lte: new Date(end)    
          }
        },
      },
      {
        $match: {
          Tag: { $in: ["Lend", "Borrow", "Repayment", "Repay Loan"] }
        }
      }
    ]
    const result = await Add.aggregate(pipeline)
    // console.log(result);
    
    res.status(200).json(result)

  }catch(error) {
    res.status(500).json({message : "Error filtering data", error})
  }
}

module.exports.searchByTags = async(req, res) => {
  const {startDate, endDate, email, tag} = req.body.body
  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Both startDate and endDate are required" });
  }
  const start = new Date(startDate);
  let end = new Date(endDate);
      end.setUTCHours(23, 59, 59, 999); 

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }
    try{
      const pipeline = [
        {
          $match: {
            email: email,
            createdAt: {
              $gte: new Date(start), 
              $lte: new Date(end)    
            }
          },
        },
        {
          $match: {
            Tag: tag
          }
        }
      ]
      const result = await Add.aggregate(pipeline)
      console.log(result);
      
      res.status(200).json(result)
  
    }catch(error) {
      res.status(500).json({message : "Error filtering data", error})
    }
}