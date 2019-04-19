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
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, validate: custom, required: true, unique: true }

}, userOptions);

userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, res) => {
    delete res._id;
    delete res.__v;
  }
});

userSchema.methods.checkPass = function(pwd) {
  return bcrypt.compareSync(pwd, this.password)
};

userSchema.methods.format = function() {
  return {
    id: this.id,
    firstname: this.firstname,
    lastname: this.lastname,
    contact: this.contact
  }
}

/*hash password on save */
userSchema.pre('save', function(next) {

  let user = this;
  
  if(!user.isModified('password')) {
    return next()
  }

  user.password = bcrypt.hashSync(user.password, 10)
 
  return next()
});




module.exports = mongoose.model('User', userSchema)
