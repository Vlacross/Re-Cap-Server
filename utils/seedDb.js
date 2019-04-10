const mongoose = require('mongoose');
const { MONGODB_URI, PORT } = require('../config');
const server = mongoose.connect;
const db = mongoose.connection;
const bcrypt = require('bcryptjs');

const { Course, User, Student, Teacher } = require('../models');

const seedStyles  = require('../db/styles');
const seedUsers = require('../db/users');
const seedStudents = require('../db/students');
const seedTeachers = require('../db/teachers')

const allUsers = [ ...seedStudents, ...seedTeachers, ...seedUsers ]


console.log("Mounting DB")
server(MONGODB_URI, {newUrlParser: true})
.then(() => {
  console.info('dropping Database');
  return db.dropDatabase();
})
.then(() => {
  return Promise.all(allUsers.map( user => bcrypt.hash(user.password, 10)))
})
.then((digests) => {
allUsers.forEach((user, i) => user.password = digests[i])

  console.info('Loading Data')
  return Promise.all([
    Course.insertMany(seedStyles),
    User.insertMany(seedUsers),
    Student.insertMany(seedStudents),
    Teacher.insertMany(seedTeachers)
  ])
  })
.then(() => {
  console.info('unMounting')
  return mongoose.disconnect()
})
.catch(err => {
  console.info('ERROR', err.message)
  console.info(err)
  process.exit(1)
})
 

