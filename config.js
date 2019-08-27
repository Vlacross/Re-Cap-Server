require('dotenv').config()

if (process.env.NODE_ENV === 'development') {
  console.log('bleme')
} else {
  console.log('none', process.env.NODE_ENV)
}

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.NODE_ENV === 'development' ? 'mongodb://localhost/dance-class' : process.env.MONGODB_URI ,
  TEST_MONGODB_URI:  process.env.TEST_MONGODB_URI  || 'mongodb://localhost/dance-class-test',
  ALG: process.env.ALGORITHM,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_ORIGIN: [process.env.CLIENT_ORIGIN, 'http://localhost:3000'] 
}




/*

*/






