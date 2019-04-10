const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const User = require('./user');

const { email } = require('./validators');
var custom = [email, 'Must have Valid Email format'];


const studentSchema = new Schema({
  enrolled: { type: Boolean, required: true },
  courses: [{
    type: ObjectId,
    ref: 'Course',
    required: function () { return this.enrolled }
  }]
});

const Student = User.discriminator('Student', studentSchema);






module.exports = mongoose.model('Student', studentSchema)
