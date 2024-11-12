const { addSpending, getRecentData } = require("../controllers/spending...controller");

const router = require("express").Router();

router.post("/add", addSpending)
router.post("/get", getRecentData)

module.exports = router