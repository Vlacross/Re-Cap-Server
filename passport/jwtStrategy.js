const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { JWT_SECRET, ALGORITHM } = require('../config');

const { User } = require('../models');



const options = {
  secretOrKey: JWT_SECRET,
  algorithm: ALGORITHM,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer')
}

const jwtStrategy = new JwtStrategy(options, function(jwt_payload, done) {
  User.findOne({_id: jwt_payload.user.id}, function(err, user) {
    if(err) { return done(err, false); }
    if(user) { return done(null, user); } 
    else {
      return done(null, false);
    }
    
  });
});


module.exports = jwtStrategy 
