const router = require("express").Router();
const passport = require("passport");
const { loginController, signupController } = require("../controllers/user.controller");

router.post("/login", loginController);
router.post("/signup", signupController);
router.post("/signup", signupController);



module.exports = router