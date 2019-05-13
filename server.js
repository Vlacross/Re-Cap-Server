const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const { PORT, NODE_ENV, MONGODB_URI, CLIENT_ORIGIN } = require('./config');
const  { Course, User }  = require('./models');
const  { AuthRoute }  = require('./passport');
const  { CourseRoutes, UserRoutes }  = require('./routes');

let banner = `Welcome`;
app.use(
  cors({
      origin: CLIENT_ORIGIN
    })
    );


app.use(morgan(
  NODE_ENV === 'development' ? 'dev' : 'tiny',
  {
    skip: () => NODE_ENV === 'test'
  }
  ));
  
app.use('/login', AuthRoute);
app.use('/courses', CourseRoutes);
app.use('/accounts', UserRoutes);


app.get('/', (req, res) => {
  console.log('made first GET!', CLIENT_ORIGIN)

  res.json(banner).status(200)
});




app.get('/too', (req, res) => {
  console.log('trighnahGetzum')

  User.findOne()
  .then(user => {
    console.log(user)
    res.status(201).json(user)
  })

  
})

app.use('*', (req, res) => {
  res.status(418).json({message: `Specified path not found!`})
})




let server;

function runServer() {
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, err => {
    if(err) {
      console.log(err)
      reject(err);
    }

    server = app.listen(PORT, function () {
      
      if (NODE_ENV === 'development') {
        console.log(`Glistening on port ${this.address().port}`)
      }

      console.log(`connected to ${MONGODB_URI}`)
      })

  });

};





if (require.main === module) {
  runServer()
}

module.exports = { app }
