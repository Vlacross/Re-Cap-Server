const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Course } = require('../models')


// const jwtStrategy = require('../passport');
// const passport = require('passport');
// passport.use('JWT', jwtStrategy);
// const jwtAuth = passport.authenticate('JWT', { session: false });




router.use(jsonParser);
// router.use('*', jwtAuth);


router.get('/', (req, res) => {
  console.log('CoursesTrigger')
  Course.find()
    .then(courses => {
      
        return res.json(courses)})

})




module.exports = router
