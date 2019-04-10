const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const User = require('./user');

const { email } = require('./validators');
var custom = [email, 'Must have Valid Email format'];


const teacherSchema = new Schema({
  activeTeacher: {type: Boolean, requied: true},
  course: {
    type: ObjectId,
    ref: 'Course',
    required: function() {return this.activeTeacher}
  },

});

const Staff = User.discriminator('Staff', teacherSchema);





module.exports = mongoose.model('Teacher', teacherSchema)
