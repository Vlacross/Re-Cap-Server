const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Course, User, Student } = require('../models')

const { isStudent, checkEnrolled, noDuplicates, avoidExceed } = require('./validators')

const jwtStrategy  = require('../passport/jwtStrategy');
// const localStrategy = require('../passport');

const passport = require('passport');

// passport.use('local', localStrategy);
passport.use('JWT', jwtStrategy);

// const localAuth = passport.authenticate('local', { session: false });
const jwtAuth = passport.authenticate('JWT', { session: false });




router.use(jsonParser);
// router.use('*', jwtAuth);


router.get('/', (req, res) => {
  console.log('CoursesTrigger')
  Course.find()
    .then(list => {
      courses = [];
      list.forEach(course => {
        courses.push(course.displayCard())
      })
      
        return res.json(courses)})

})

router.get('/details/:id', (req, res) => {
  console.log('Firing Single Course')
  Course.findOne({_id: req.params.id})
    .then(course => {

     return res.json(course.infoSheet())
      })
   

})


/*Student signup */

/*

______________________________________________________________________________
______________________________________________________________________________
-find course by id(id connected to card user clicks on client side)
-[if no kind]findByIdAndupdate userData to be student(object.assign({}, userData, {enrolled: true, courses: [ {progress: 0, { courseId } }]}))
-[if already Student] findByIdAndupdate userData.courses push  {progress: 0, { courseId } }
isStudent, checkEnrolled, noDuplicates,
*/

router.put('/signup/:id', isStudent, checkEnrolled, noDuplicates, avoidExceed, (req, res) => {
  console.log('courseSignUp', req.body, typeof req.body)
  console.log('paramtel', req.params.id, typeof req.params.id)
    /*share Id's between course and student dataFiles */
    Promise.all([
      Course.findByIdAndUpdate(req.params.id, { $push: { 'enrollments': req.body.user } }, { runValidators: true, new: true }),
      Student.findByIdAndUpdate(req.body.user, { $push: { 'courses': req.params.id }, $set: { 'enrolled': true } }, { runValidators: true, new: true })
      .then(student => {
        // console.log('studdell', student)
        res.json(student.format())
      })
    ])
  // })
  .catch(err => {
    console.log(err.message)
    res.json(err)
  })
});


router.put('/remove/:id', jwtAuth, (req, res) => {
  console.log('courseUnSignUp', req.body)
    /*remove shared Id's between course and student dataFiles */
  Promise.all([
    Course.findByIdAndUpdate(req.params.id, { $pull: { 'enrollments': req.body.user } }, { new: true }),
    Student.findByIdAndUpdate(req.body.user, { $pull: { 'courses': req.params.id }, $set: { 'enrolled': false } }, { new: true })
    .then(student => {
      console.log('studdell', student)
      res.json(student.format())
    })
  ])
  
  .catch(err => {
    console.log(err.message)
    res.json(err)
  })

});


module.exports = router
