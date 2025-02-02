const { alltime, today, fromRange, dateRange, searchUdhari, searchByTags, optNames} = require("../controllers/filter.controller");

const router = require("express").Router();

router.post("/alltime", alltime)
router.post("/today", today)
router.post("/fromrange", fromRange)
router.post("/by-range", dateRange)
router.post("/search-udhari", searchUdhari)
router.post("/search-by-tags", searchByTags)
router.post("/opt-names", optNames)


module.exports = router