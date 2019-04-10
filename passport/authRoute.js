const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const mongoose = require('mongoose');

const passport = require('passport');
const jwtStrategy  = require('./jwtStrategy');
const localStrategy = require('./localStrategy')

passport.use('local', localStrategy);
passport.use('JWT', jwtStrategy);

const localAuth = passport.authenticate('local', { sessiong: false });
const jwtAuth = passport.authenticate('JWT', { sessiong: false });


const { User } = require('../models')
const { ALG, JWT_EXPIRY, JWT_SECRET } = require('../config');
const options = {
  algorithm: ALG,
  expiresIn: JWT_EXPIRY
};

console.log('inauth')
router.use(jsonParser)

router.post('/', localAuth, (req, res) => {
  console.log('GotPast')
  console.log(req.body)
  res.json(`HELLO!`).status(200)
})


module.exports = router;