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
  console.log('CoursesTrigger', req.body.id)
  User.deleteOne({_id: req.body.id})
    .then(() => {
      
        return res.json({
          message: "User has been deleted successfully"
        })
      })

})




module.exports = router
