const mongoose = require('mongoose');

const { User, Student, Teacher, Course } = require('../models')

const isStudent = function(req, res, next) {
console.log('isStudent')
  return User.findOne({_id: req.body.user}, function(err, user) {

    if(err) {
      let msg = 'Something went wrong!';
      return Promise.reject({message: msg})
    }
    if(!user.kind) {
      return User.findByIdAndUpdate(user.id, { $set: {kind: "Student"} }, {upsert: true, new: true })
      .then(user => {
        return Student.findByIdAndUpdate(user.id, { $set: { enrolled: false, courses: [ ] } }, {upsert: true, new: true, runValidators: true })
      })
      .then(student => {
        return next(null, student)
      })
    }  
    return next(null, user) 
  })
};

const checkEnrolled = function(req, res, next) {
  console.log('checkEnrolled')

  return Student.findOne({_id: req.body.user}, function(err, student) {
    if(err) {
      let msg = 'Something went wrong!';
      return Promise.reject({message: msg})
    }
    if(!student) {
      let msg = 'Student could not be found!';
      return Promise.reject({message: msg})
    }
    if(student.enrolled === true) {
      return res.json({
        type: 'error',
        code: 451,
        message: "User cannot enroll in more than one course at a time!"
      })
    }
    return next(null, student)
  })  
};

const noDuplicates = function(req, res, next) {
  console.log('noDuplicates')

  return Course.findOne({_id: req.params.id}, function(err, course) {

    if(err) {
      let msg = 'Something went wrong!';
      return Promise.reject({message: msg})
    }
    if(!course) {
      let msg = 'Course could not be found in database!';
      return Promise.reject({message: msg})
    }
    let id = JSON.stringify(req.body.user)
    let current = course.enrollments.filter(student => (JSON.stringify(student) === id))
    if(current.length !== 0) {
      console.log('already enrolled!')
      return res.json({
        type: 'error',
        code: 451,
        message: "User is already enrolled in this course!"
      })
    }
    return next(null, course)
  })
};

const avoidExceed = function(req, res, next) {
  console.log('avoidExceed');

  return Course.findOne({_id: req.params.id}, function(err, course) {

    if(err) {
      let msg = 'Something went wrong!';
      return Promise.reject({message: msg})
    }
    if(course.enrollments.length > 11) {
      return Course.findByIdAndUpdate(course.id, { $set: { 'accepting': false } })
      .then(() => {
        res.json({
          type: 'error',
          code: 451,
          message: "Maximum student occupancy reached!"
        })
      })
    }
    return next(null, course)
  })
};


module.exports ={
  isStudent,
  checkEnrolled,
  noDuplicates,
  avoidExceed
}
