const { updateRoomRentInfo } = require("../controllers/user.controller");
const { authenticateToken } = require("../middlewares/user.middleware");
const User = require("../models/user.model");
const clientUrl = process.env.CLIENT_URL

const router = require("express").Router();


router.get("/getUser", authenticateToken, async(req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
        user
    })
})
router.get("/ping", async(req, res) => {
    res.status(200).json({
        "message" : "ping"
    })
})
router.post("/update-roomrent-info", updateRoomRentInfo)



module.exports = router