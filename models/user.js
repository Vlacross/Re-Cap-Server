const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const { email } = require('./validators')
var custom = [email, 'Must have Valid Email format']


/* add - isTeacher: Boolean() */
const userSchema = new Schema({
  fistName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  passWord: { type: String, required: true },
  contact: { type: String, validate: custom, required: true },
  isTeacher: { type: Boolean, required: true },
  enrolled: { type: Boolean, required: function () { return !this.isTeacher } },
  courses: [{
    type: ObjectId,
    ref: 'Course',
    required: function () { return this.status || this.isTeacher }
  }]

}, {
    timestamps: true
  });

userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete res._id;
    delete res.__v;
  }
});



module.exports = mongoose.model('User', userSchema)
