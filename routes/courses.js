const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Course, User, Student } = require('../models')


// const jwtStrategy = require('../passport');
// const passport = require('passport');
// passport.use('JWT', jwtStrategy);
// const jwtAuth = passport.authenticate('JWT', { session: false });




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
*/

router.put('/signup/:id', (req, res) => {
  console.log('courseSignUp', req.body)

  User.findOne({_id: req.body.user})
  .then(user => {
  // console.log(!user.kind)
    if(!user.kind) {
      return User.findByIdAndUpdate(user.id, { $set: {kind: "Student"} }, {upsert: true, new: true })
      .then(user => {
        return Student.findByIdAndUpdate(user.id, { $set: { enrolled: false, courses: [ ] } }, {upsert: true, new: true, runValidators: true })
      })
    }
    // console.log(user.kind)
  })
  Course.findOne({_id: req.params.id})
  .then(course => {
    let id = JSON.stringify(req.body.user)
    let current = course.enrollments.filter(student => (JSON.stringify(student) === id))
    if(current.length !== 0) {
      console.log('already enrolled!')
      return Promise.reject({
        code: 451,
        message: "User is already enrolled in this course!"
      })
    }
    Promise.all([
      Course.findByIdAndUpdate(req.params.id, { $push: { 'enrollments': req.body.user } }, { new: true }),
      Student.findByIdAndUpdate(req.body.user, { $push: { 'courses': req.params.id } }, { new: true })
      .then(student => {
        console.log('studdell', student)
        res.json(student)
      })
    ])
  })
  .catch(err => {
    console.log(err.message)
    res.json({
      code: err.code,
      message: err.message
    })
  })
});


module.exports = router
