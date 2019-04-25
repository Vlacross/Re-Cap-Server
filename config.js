require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI,
  TEST_MONGODB_URI:  process.env.TEST_MONGODB_URI,
  ALG: process.env.ALGORITHM,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_ORIGIN: 'https://enigmatic-anchorage-28127.herokuapp.com/'
}




/*


 || 'mongodb://localhost/dance-class-test'
|| 'mongodb://localhost/dance-class'
|| 'HS256'
|| 'milldrew'


*/






