const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const mongoose = require('mongoose');

const jwtStrategy  = require('./jwtStrategy');
const localStrategy = require('./localStrategy');

const passport = require('passport');

passport.use('local', localStrategy);
passport.use('JWT', jwtStrategy);


const localAuth = passport.authenticate('local', { session: false });
const jwtAuth = passport.authenticate('JWT', { session: false });


const { User } = require('../models')
const { ALG, JWT_EXPIRY, JWT_SECRET } = require('../config');
const options = {
  algorithm: ALG,
  expiresIn: JWT_EXPIRY
};


router.use(jsonParser)

router.post('/', localAuth, (req, res) => {
  console.log('GotPast')
  console.log(req.body)
  res.json(`HELLO!`).status(200)
})


module.exports = router;