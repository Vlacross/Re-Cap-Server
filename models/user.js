const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const { email } = require('./validators')
var custom = [email, 'Must have Valid Email format']


const userOptions = {
  discriminatorKey: 'kind',
  collection: 'users',
  timestamps: true
};


/* add - isTeacher: Boolean() */
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  passWord: { type: String, required: true },
  contact: { type: String, validate: custom, required: true }

}, userOptions);

userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete res._id;
    delete res.__v;
  }
});

// const User = mongoose.model('User', userSchema);



// const teacherSchema = new Schema({
//   activeTeacher: {type: Boolean, requied: true},
//   course: {
//     type: ObjectId,
//     ref: 'Course',
//     required: function() {return this.activeTeacher}
//   },

// });

// const Staff = new User.discriminator('Staff', teacherSchema, options);



// const studentSchema = new Schema({
//   enrolled: { type: Boolean, required: true },
//   courses: [{
//     type: ObjectId,
//     ref: 'Course',
//     required: function () { return this.status || this.isTeacher }
//   }]
// });

// const Student = new User.discriminator('Student', studentSchema, options);






module.exports = mongoose.model('User', userSchema)
