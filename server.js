const express = require('express');
const app = express();

const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const { PORT, NODE_ENV } = require('./config');

let banner = `Welcome`;

app.use(morgan(
  NODE_ENV === 'development' ? 'dev' : 'tiny',
  {
    skip: () => NODE_ENV === 'test'
  }
));

app.use(cors());


app.get('/', (req, res) => {
  console.log('made first GET!')

  res.json(banner).status(200)
});

app.listen(PORT, function () {
  if (NODE_ENV === 'development') {
    console.log(`Listening on port ${this.address().port}`)
  }
});