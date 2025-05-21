const router = require("express").Router();
const {cloudinarySignature} = require("../controllers/helpers.controller");

router.post("/cloudinary-signature", cloudinarySignature)

module.exports = router