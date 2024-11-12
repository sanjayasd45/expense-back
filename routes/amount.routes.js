const { addAmount } = require("../controllers/amount.controller");

const router = require("express").Router();

router.post("/add", addAmount)

module.exports = router