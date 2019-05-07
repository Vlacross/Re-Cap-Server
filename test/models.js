const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const server = mongoose.connect;
const db = mongoose.connection;
const bcrypt = require('bcryptjs');

const { app } = require('../server');
const { TEST_MONGODB_URI } = require('../config');

const { Course, User, Student, Teacher } = require('../models');


const seedStyles = require('../db/styles');
const seedUsers = require('../db/users');
const seedStudents = require('../db/students');
const seedTeachers = require('../db/teachers');
const allUsers = [ ...seedStudents, ...seedTeachers, ...seedUsers ]

describe('All Course actions', function() {
  this.timeout(5000)

  before(function() {
     console.log('Mounting', TEST_MONGODB_URI)
     return server(TEST_MONGODB_URI, { useNewUrlParser: true })
   })
  
  beforeEach(function() {
     console.log('dropping')
     return db.dropDatabase()
     .then(() => {
       return Promise.all(allUsers.map(user => bcrypt.hash(user.password, 10)))
     })
     .then((digests) => {
       allUsers.forEach((user, i) => user.password = digests[i])
       console.log('seeding')
       return Promise.all([
         Course.insertMany(seedStyles),
         User.insertMany(seedUsers),
         Student.insertMany(seedStudents),
         Teacher.insertMany(seedTeachers)
       ]);
      })
     .catch(err => {
       console.error(`ERROR: ${err.message}`)
       console.error(err)
     })
  
   });
  
   after(function() {
     console.log('unMounting')
     return mongoose.disconnect()
   })
 


   describe('unit functions', function() {
     
    it('Should prove Unit functions', () => {
        return User.find()
        .then(users => {
          // console.log(users)
          expect(users).to.be.an('array')
        })
      })
    
    it('Should show user data has correct fields', () => {
      return User.findOne()
      .then(user => {
        // console.log(Object.entries(user._doc))
        expect(user).to.be.an('object')
        expect(user._doc).to.include.keys('firstname', 'lastname', 'username', 'contact', 'password') 
      })
    })

    it('Should show only Student models', () => {
      return Student.find()
      .then(students => {
        // console.log(students)
        expect(students).to.be.an('array')
      })
    })

    it('Should show user data has correct fields', () => {
      return Student.findOne()
      .then(student => {
        expect(student).to.be.an('object')
        expect(student._doc).to.include.keys('enrolled', 'courses', 'progress', 'kind')
        expect(student._doc.kind).to.equal('Student') 
      })
    })

    it('Should show user data has correct fields', () => {
      return Teacher.findOne()
      .then(teacher => {
        // console.log(Object.entries(teacher._doc))
        expect(teacher).to.be.an('object')
        expect(teacher._doc).to.include.keys('activeTeacher', 'course', 'kind')
        expect(teacher._doc.kind).to.equal('Staff') 
      })
    })

    it('Should show user data has correct fields', () => {
      return Course.findOne()
      .then(course => {
        // console.log(Object.entries(course._doc))
        expect(course).to.be.an('object')
        expect(course._doc).to.include.keys('accepting', 'enrollments', 'style', 'teacher', 'details', '_id')
        expect(course._doc.details).to.include.keys('descriptionShort', 'descriptionLong', 'difficulty', 'cost', 'length', 'schedule')
        
      })
    })



   });

   

 
 


});




