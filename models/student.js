const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Shema.Types.ObjectId;


const studentSchema = new Schema({
  fistName: {type: String, required: true},
  lastName: {type: String, required: true},
  userName: {type: String, required: true},
  passWord: {type: String, required: true},
  contact: {type: String}, required: true,
  enrolled: {
    status: {Boolean, required: true},
    courses: {type: ObjectId, ref: 'Course'}
  }
}, {
  timestamps: true
});

studentSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, res) => {
    delete res._id;
    delete res.__v;
  }
});



module.exports = mongoose.model('Student', studentSchema)
