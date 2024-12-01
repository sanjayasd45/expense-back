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
    console.group("Authentication Debug");
    console.log("Full Request Object Keys:", Object.keys(req));
    console.log("Cookies Raw:", req.cookies);
    console.log("Signed Cookies:", req.signedCookies);
    console.log("Session Object:", JSON.stringify(req.session, null, 2));
    console.log("Session ID:", req.sessionID);
    
    // Detailed Passport Information
    console.log("Passport in Session:", req.session?.passport);
    console.log("Passport User:", req.session?.passport?.user);
    
    // Additional Authentication Checks
    console.log("Is Authenticated:", req.isAuthenticated());
    console.log("User Object:", JSON.stringify(req.user, null, 2));
    
    // Headers for Cross-Origin Context
    console.log("Request Headers:", {
        origin: req.get('origin'),
        host: req.get('host'),
        referer: req.get('referer')
    });
    console.groupEnd();

    if (req.isAuthenticated()) {
        res.status(200).json({
            error: false,
            message: "Successfully authenticated",
            user: req.user
        });
    } else {
        res.status(403).json({
            error: true, 
            message: "Not authenticated",
            sessionInfo: req.session?.passport
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