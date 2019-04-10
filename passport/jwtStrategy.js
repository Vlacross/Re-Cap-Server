const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { JWT_SECRET, ALGORITHM } = require('../config');

const { User } = require('../models');



const options = {
  secretOrKey: JWT_SECRET,
  algorithm: ALGORITHM,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtStrategy = new JwtStrategy(options, function(jwt_payload, done) {
  User.findOne({id: jwt_payload.sub}, function(er, usr) {
    if(err) { return done(err, false); }
    if(user) { return done(null, user); } 
    else {
      return done(null, false);
    }
    
  });
});


module.exports = jwtStrategy 
