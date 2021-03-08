const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const config = require('config');
const secretOrkey = config.get('secretOrkey')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrkey
}

passport.initialize();
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    const { _id } = jwt_payload
    try {
        const user = await User.findById(_id)
        user ? done(null, user) : done(null, false)
    } catch (error) {
        console.log(error)

    }

})
);

module.exports = isAuth = () => passport.authenticate('jwt', (req,res)=>res.json(req.user)); 

