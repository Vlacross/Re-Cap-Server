const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const {VALID_STYLES} = require('./validators');


const courseSchema = new Schema({
  style: {type: String, required: true, enum: VALID_STYLES},
  teacher: {type: String, required: true},
  accepting: {type: Boolean, required: true},
  details: {
    descriptionShort: {type: String, required: true},
    descriptionLong: {type: String, required: true},
    difficulty: {type: String, required: true},
    cost: {type: Number, required: true},
    length: {type: Number, required: true},
    schedule: {type: String, required: true}
  },
  enrollments: [{
    type: ObjectId, 
    ref: 'User'
  }]
 
}, {
  timestamps: true
});

courseSchema.set('toJSON', {
  virtuals: true, 
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Course', courseSchema) 

/*  For setting the rates to a dollar amount - may need to adjust path for subDocs */
// courseSchema.path('deatils.rates').get(function(num) {
//   return (num / 100).toFixed(2);
// });

// courseSchema.path('deatils.rates').set(function(num) {
//   return (num / 100).toFixed(2);
// });



/*
{
    "style": "Swing",
    "teacher": "Geno",
    "accepting": "true",
    "details": {
      "descriptionShort": "Fast-paced partners dance involving spins and quick foot-work",
      "descriptionLong": "Beginning in the 1920s  1930s time era, Big Bands reighned the social music culture...",
      "difficulty": "on a scale from 1(easy) to 5(advanced) \n1, 3, 4",
      "rates": "$500",
      "length": "6 wks",
      "schedule": "mon, wed"
    }
  },



const courseSchema = new Schema({
  style: {type: String, required: true},
  teacher: {type: ObjectId, ref:"Teacher", required: true},
  capacity: {type: Number, required: true},
  enrolled: [{type: ObjectId, ref: "Student"}],
  details: {
    descriptionShort: {type: String, required: true},
    descriptionLong: {type: String, required: true},
    dificulty:{
      level: [1, 2, 3, 4, 5],
      description: String},
    rates: {type: Number, required: true},
    length: {type: Number, required: true},
    schedule: {
      days: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
      time: Number
    }
  }







*/

