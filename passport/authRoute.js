const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()


const { checkComplete, formatToCommon, emailFormatCheck } = require('./validators')
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
const buildToken = function(user) {
  return jwt.sign({ user }, JWT_SECRET, options)
};

router.use(jsonParser)


router.post('/refresh', jwtAuth, (req, res) => {
  console.log('that It ISSSSS!')
  token = buildToken(req.user.format())
  res.json(token)
})


router.post('/', localAuth, (req, res) => {
console.log(req.body)
User.findOne({username: req.body.username})
.then(user => {

    let token = buildToken(user.format())
    
  console.log('loginFired')
  res.json(token)
})
.catch(err => res.json(err))
});


router.post('/newUser', 
  checkComplete,
  formatToCommon,
  emailFormatCheck, (req, res) => {
  console.log('GotPast')
  console.log(req.body)
  const { firstname, lastname, username, contact, password } = req.body;
  User.create({
    firstname,
    lastname,
    username,
    contact,
    password
  })
  .then(newUser => {
    let token = buildToken(newUser.format())
    res.json(token)
  })
  .catch(err => {
    console.log(err)
    // let error = {
    //   code: err.code,
    //   message: err.errmsg
    // }
    res.json(err)
  })

});



module.exports = router;