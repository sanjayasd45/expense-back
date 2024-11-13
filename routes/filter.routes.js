const { alltime, today, fromRange } = require("../controllers/filter.controller");

const router = require("express").Router();

router.post("/alltime", alltime)
router.post("/today", today)
router.post("/fromrange", fromRange)

module.exports = router