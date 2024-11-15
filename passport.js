const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require("./models/user.model.js");
const serverUrl = process.env.SERVER_BASE_URL


passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${serverUrl}/auth/google/callback`,
    passReqToCallback: true,
    scope: ['profile', 'email']
  }, (req, accessToken, refreshToken, profile, callback) => {
    const user = {
      name: profile.displayName,
      email: profile.emails[0].value,
      profile_img: profile.picture

    };
    console.log("from backend",user);
    
    // Check if user exists in your database (implement your logic here)
    User.findOne({ email: user.email })
    .then(existingUser => {
        if (existingUser) {
            console.log(existingUser); 
        } else {   
            console.log("1");
            return new User(user).save()
        }
    }).then(() => {
        callback(null, profile)
        console.log("2");
    })
    .catch(err => console.log(err));
}))