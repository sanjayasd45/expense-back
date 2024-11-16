const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require("./models/user.model.js");
const serverUrl = process.env.SERVER_BASE_URL


passport.serializeUser((user, done) => {
    console.log("serializeUser => ", user);
    done(null, user)
});
passport.deserializeUser(async(user, done) => {
    console.log("deserializeUser");
    console.log("deserializeUser => ", user);
    done(null, user)
})

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${serverUrl}/auth/google/callback`,
            passReqToCallback: true,
            scope: ["profile", "email"],
        },
        async (req, accessToken, refreshToken, profile, callback) => {
            try {
                const user = {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    profile_img: profile.picture,
                };

                console.log("from backend", user);

                // Check for existing user in database
                let existingUser = await User.findOne({ email: user.email });
                if (!existingUser) {
                    console.log("Creating new user");
                    existingUser = await new User(user).save();
                }

                // Pass user to Passport
                callback(null, user);
            } catch (error) {
                console.error(error);
                callback(error);
            }
        }
    )
);
