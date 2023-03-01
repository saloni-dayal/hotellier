const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user , done) => {
	done(null , user);
})
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new GoogleStrategy({
	clientID:"566158259627-99mcih6f02ei92cnae4t716a979riv00.apps.googleusercontent.com", // Your Credentials here.
	clientSecret:"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", // Your Credentials here.
	callbackURL:"http://localhost:3007/auth/callback",
	passReqToCallback:true
},
function(request, accessToken, refreshToken, profile, done) {
	return done(null, profile);
}
));
