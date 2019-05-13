const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoose = require('mongoose');
const server = mongoose.connect;
const db = mongoose.connection;
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')

const { app } = require('../server');
const { TEST_MONGODB_URI, ALG, JWT_SECRET, JWT_EXPIRY } = require('../config');

const { Course, User, Student, Teacher } = require('../models');


const seedStyles = require('../db/styles');
const seedUsers = require('../db/users');
const seedStudents = require('../db/students');
const seedTeachers = require('../db/teachers');

chai.use(chaiHttp);

const options = {
  algorithm: ALG,
  exiresIn: JWT_EXPIRY
};

const buildToken = function(user) {
  return jwt.sign({ user }, JWT_SECRET, options)
};

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



   describe('basic Unit-Integration functions', function() {
     

    it('Should prove unit Integration functions -GET', () => {
        return chai.request(app)
          .get('/')
          .then((res) => {
            console.log(res.body)
            expect(res.body).to.include('Welcome')
          })
        
      })

      it('Should get array of courses', () => {
        return chai.request(app)
          .get('/courses')
          .then((res) => {
            console.log(res.body)
            expect(res.body).to.be.an('array')
          })
      })

      it('Should get single course info by id', () => {
        return chai.request(app)
          .get('/courses')
          .then((res) => {
            console.log(res.body[0].id)
            return chai.request(app)
            .get(`/courses/details/${res.body[0].id}`)
            .then(res => {
              console.log(res.body)
              expect(res.body).to.be.an('object')
              expect(res.body).to.have.keys('style', 'teacher', 'accepting', 'classSize', 'description', 'length', 'cost', 'schedule', 'id')
            })
          })
      })

      /*
      enroll endpoint
      */
 





   });
 
  



  

   

 
 


});




