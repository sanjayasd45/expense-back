const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require("./models/user.model.js");
const serverUrl = process.env.SERVER_BASE_URL

// module.exports.userInfo = {}

passport.serializeUser((user, done) => {
    console.log("Serializing user:", user);
    done(null, user.email); 
});

passport.deserializeUser(async (email, done) => {
    try {
        // console.log("Deserializing user with email:", email);
        const user = await User.findOne({ email });
        if (user) {
            done(null, user);
        } else {
            done(new Error('User not found'));
        }
    } catch (error) {
        done(error);
    }
});


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${serverUrl}/auth/google/callback`,
            passReqToCallback: true,
            proxy: true,
            scope: ["profile", "email"],
        },
        async (req, accessToken, refreshToken, profile, callback) => {
            try {
                const user = {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    profile_img: profile.picture,
                };

                // console.log("from backend", user);

                // Check for existing user in database
                let existingUser = await User.findOne({ email: user.email });
                if (!existingUser) {
                    // console.log("Creating new user");
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
