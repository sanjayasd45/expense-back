const router = require("express").Router();
const passport = require("passport");
const { userInfo } = require("../passport");


router.get("/login/faild", (req, res) => {
    req.status(401).json({
        error : true,
        message : "login faild"
    })
})
router.get("/login/success", (req, res) => {
    console.log("Session:", req.session);
    console.log("User:", req.user);
    console.log("Is Authenticated:", req.isAuthenticated());

    if (req.isAuthenticated()) {
        res.status(200).json({
            error: false,
            message: "Successfully authenticated",
            user: {
                name: req.user.name,
                email: req.user.email,
                profile_img: req.user.profile_img
            }
        });
    } else {
        res.status(403).json({
            error: true, 
            message: "Not authenticated"
        });
    }
});
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