const { deleteTxn } = require("../controllers/delete.controller")

const router = require("express").Router()

router.post("/txn", deleteTxn)

module.exports = router