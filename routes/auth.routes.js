const router = require("express").Router();
const passport = require("passport");


router.get("/login/faild", (req, res) => {
    req.status(401).json({
        error : true,
        message : "login faild"
    })
})
router.get("/login/success", (req, res) => {
    console.log("Session ID:", req.sessionID); // Check session ID
    console.log("Session Data:", req.session); // Check session data
    console.log("User Info:", req.user);
    console.log("req.session.passport.user => ",req.session.passport.user);

    if(req.user){
        res.status(200).json({
            error : false,
            message : "successfully registered",
            user : req.user
        }) 
    }else{
        console.log("error");
        res.status(403).json({error:true, message : "not authenticated"})
    }
})
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/faild"
}))

router.get("/google", passport.authenticate("google", ["profile", "email"]))

router.get("/logout", (req, res) => {
    req.logout(() => {
        console.log("logout");
        res.redirect(process.env.CLIENT_URL);
    });
});

module.exports = router