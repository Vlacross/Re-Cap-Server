const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()


const { checkComplete, formatToCommon, emailFormatCheck, validatorChain } = require('./validators')
const jwtStrategy  = require('./jwtStrategy');
const localStrategy = require('./localStrategy');

const passport = require('passport');

passport.use('local', localStrategy);
passport.use('JWT', jwtStrategy);


const localAuth = passport.authenticate('local', { session: false });
const jwtAuth = passport.authenticate('JWT', { session: false });


const { User, Student, Teacher } = require('../models')
const { ALG, JWT_EXPIRY, JWT_SECRET } = require('../config');
const options = {
  algorithm: ALG,
  expiresIn: JWT_EXPIRY
};

router.use(jsonParser)

router.post('/', 
  checkComplete,
  formatToCommon,
  emailFormatCheck, (req, res) => {
  console.log('GotPast')
  console.log(req.body)
  
  res.json(`HELLO!`).status(200)
})

router.post('/newUser', localAuth, (req, res) => {
console.log(req.body)
User.findOne({username: req.body.username})
.then(user => {

  let rez = {
    user: {
      firstname: user.firstName,
       lastname: user.lastName
      }
    }
  console.log(rez)
  res.json(rez)
})
})


module.exports = router;