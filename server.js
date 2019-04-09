const express = require('express');
const app = express();

const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const { PORT, NODE_ENV, MONGODB_URI } = require('./config');
const  Course  = require('./models/course')

let banner = `Welcome`;

app.use(cors());

app.use(morgan(
  NODE_ENV === 'development' ? 'dev' : 'tiny',
  {
    skip: () => NODE_ENV === 'test'
  }
));



app.get('/', (req, res) => {
  console.log('made first GET!')

  res.json(banner).status(200)
});




app.get('/too', (req, res) => {
  console.log('trighnahGetzum')

  Course.findOne()
  .then(style => {
    console.log(style)
    res.status(201).json(style)
  })

  
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

