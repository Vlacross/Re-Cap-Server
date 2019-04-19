const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Course, User } = require('../models')


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

/*Student signup */

/*
-add course id's to cards on client side
______________________________________________________________________________
______________________________________________________________________________
-find course by id(id connected to card user clicks on client side)
-[if no kind]findByIdAndupdate userData to be student(object.assign({}, userData, {enrolled: true, courses: [ {progress: 0, { courseId } }]}))
-[if already Student] findByIdAndupdate userData.courses push  {progress: 0, { courseId } }
*/

router.post('/', (req, res) => {
  console.log('courseSignUp')
  Course.findOne({})
    .then(courses => {
      
        return res.json(courses)})

})


module.exports = router
