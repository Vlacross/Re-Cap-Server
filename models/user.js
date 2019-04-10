const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const bcrypt = require('bcryptjs');

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
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, validate: custom, required: true, unique: true }

}, userOptions);

userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete res._id;
    delete res.__v;
  }
});

userSchema.methods.checkPass = function(pwd) {
  return bcrypt.compareSync(pwd, this.password)
};




module.exports = mongoose.model('User', userSchema)
