const mongoose = require('mongoose');
const { MONGODB_URI, PORT } = require('../config');
const server = mongoose.connect;
const db = mongoose.connection;

const { Course, User, Student } = require('../models');

const seedStyles = require('../db/styles');
const seedUsers = require('../db/users');
const seedStudents = require('../db/students');


console.log("Mounting DB")
server(MONGODB_URI, {newUrlParser: true})
.then(() => {
  console.info('dropping Database');
  return db.dropDatabase();
})
.then(() => {
  console.info('Loading Data')
  return Promise.all([
    Course.insertMany(seedStyles),
    Student.insertMany(seedStudents)
  ]);
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
 

