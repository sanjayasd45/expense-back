const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require("./models/user.model.js");
const serverUrl = process.env.SERVER_BASE_URL


passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser(async(user, done) => {
    // const usernew = {
    //     _id : user._id,
    //     name : user.name,
    //     email : user.email,
    //     profile_img : user.profile_img
    // }

    // const cachedUser = await Redis.redisClient.get(`user:${usernew}`);
    // if (cachedUser) {
    //     return done(null, JSON.parse(cachedUser)); // Return cached user
    // }
    // if (user) {
    //     await redisClient.set(`user:${usernew}`, JSON.stringify(user), { EX: 3600 }); // Cache for 1 hour
    //     return done(null, user);
    // }
    
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
                callback(null, existingUser);
            } catch (error) {
                console.error(error);
                callback(error);
            }
        }
    )
);
