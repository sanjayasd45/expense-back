const { alltime, today, fromRange, dateRange } = require("../controllers/filter.controller");

const router = require("express").Router();

router.post("/alltime", alltime)
router.post("/today", today)
router.post("/fromrange", fromRange)
router.post("/by-range", dateRange)

module.exports = router