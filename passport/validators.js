
const checkComplete = (req, res, next) => {
  console.log('checkComplete')
let requiredFields = ['firstname', 'lastname', 'username', 'password', 'contact'];
let missingField = requiredFields.filter(field => (!req.body[field]));
if(missingField.length > 0) {
  msg = {
    code: 422,
    message: `Missing ${missingField} in header!`,
    reason: `Missing ${missingField} in header!`
  }
  return res.status(400).json(msg)
}
return next(null, req)
}

const formatToCommon = (req, res, next) => {
  console.log('formatToCommon')
  /*remove case sensitivity and whiteSpace to avoid complications*/
  let fields = ['username', 'password'];
  fields.forEach(field => {
    if (req.body[field] != req.body[field].toLowerCase()) {
      msg = {
        code: 422,
        message: `${field} must contain only lowercase letter!`,
        reason: `${field} must contain only lowercase letter!`
      }
      return res.status(400).json(msg)
    }
  })
  fields.forEach(field => {
    if (req.body[field] != req.body[field].trim()) {
      msg = {
        code: 422,
        message: `${field} must contain no white space at beginning or end!`,
        reason: `${field} must contain no white space at beginning or end!`
      }
      return res.status(400).json(msg)
    }
  })
  return next(null, req)
  
}



const emailFormatCheck = (req, res, next) => {
  console.log('emailFormatCheck')
  let email = req.body.contact

  if(typeof email != "string" || !email.includes('@')) {

    msg = {
      code: 422,
      message: `Improper Email Format. Format example: 'email@example.com'!`,
      reason: `Improper Email Format. Format xample: 'email@example.com'!`
    }
    return res.status(400).json(msg)
  }
    return next(null, req)
};


const validatorChain = (req, res, next) => {
  checkComplete
  formatToCommon
  emailFormatCheck
  next(null, req)
}


module.exports = { checkComplete, formatToCommon, emailFormatCheck, validatorChain }
