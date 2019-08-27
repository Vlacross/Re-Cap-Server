const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { User } = require('../models')


const jwtStrategy = require('../passport');
const passport = require('passport');
passport.use('JWT', jwtStrategy);
const jwtAuth = passport.authenticate('JWT', { session: false });




router.use(jsonParser);
router.use('*', jwtAuth);


router.delete('/remove', (req, res) => {
  User.findById(req.body.id)
  .then(user => {
    if(user.username === 'jonjon' || user.username === 'tomtom') {
      return res.json({
        type: 'protected',
        code: 418,
        message: {
          title: `${user.username} is a protected demo account!`,
          info: 'If you would like to test the deletion properties, feel free to create an account!'
        }
      })
    }
    else {
      User.deleteOne({_id: req.body.id})
      .then(() => {
        
          return res.json({
            message: "User has been deleted successfully"
          })
        })
    }


  })
  

})




module.exports = router
