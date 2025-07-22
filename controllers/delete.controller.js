const Add = require('../models/add.model')

module.exports.deleteTxn = async(req, res) => {
    const _id = req.body
    try{
        const data  = await Add.findByIdAndDelete(_id)
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({ message: "Got Error While Deleting ", err });
    }
}