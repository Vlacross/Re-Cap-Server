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


router.get('/', (req, res) => {
  
  Course.find()
  .then(list => {
    courses = [];
    list.forEach(course => {
      courses.push(course.displayCard())
    })
    
    return res.json(courses)})
    
  })


  // router.use('*', jwtAuth);


router.get('/details/:id', (req, res) => {
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
    /*share Id's between course and student dataFiles */
    Promise.all([
      Course.findByIdAndUpdate(req.params.id, { $push: { 'enrollments': req.body.user } }, { runValidators: true, new: true }),
      Student.findByIdAndUpdate(req.body.user, { $push: { 'courses': req.params.id }, $set: { 'enrolled': true } }, { runValidators: true, new: true })
      .then(student => {
        res.json(student.format())
      })
    ])

    .catch(err => {
      res.json(err)
    })
});


router.put('/remove/:id', (req, res) => {
    /*remove shared Id's between course and student dataFiles */

    User.findById(req.body.user)
    .then(user => {
      if(user.username === 'jonjon' || user.username === 'tomtom') {
        return res.json({
          type: 'protected',
          code: 418,
          message: {
            title: `${user.username} is a protected demo account!`,
            info: 'If you would like to test the deletion properties, feel free to create an account!'
          }
        })
      }
      else {
        
        Promise.all([
          Course.findByIdAndUpdate(req.params.id, { $pull: { 'enrollments': req.body.user } }, { new: true }),
          Student.findByIdAndUpdate(req.body.user, { $pull: { 'courses': req.params.id }, $set: { 'enrolled': false } }, { new: true })
          .then(student => {
            res.json(student.format())
          })
        ])
        .catch(err => {
          console.log(err)
          res.json(err)
        })
      }

    })
});







module.exports = router
