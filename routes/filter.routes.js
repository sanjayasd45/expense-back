const { alltime } = require("../controllers/filter.controller");

const router = require("express").Router();

router.post("/alltime", alltime)

module.exports = router