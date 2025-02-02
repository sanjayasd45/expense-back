const Add = require('../models/add.model')

module.exports.deleteTxn = async(req, res) => {
    const _id = req.body
    try{
        const data  = await Add.findByIdAndDelete(_id)
        // console.log("delete");
        // console.log(data);
        
        return data
    }catch(err){
        // console.log(err);
        throw err
    }
}