require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: 'mongodb://localhost/dance-class' || process.env.MONGODB_URI,
  TEST_MONGODB_URI: 'mongodb://localhost/dance-class' || process.env.TEST_MONGODB_URI,
  ALG: process.env.ALGORITHM,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  NODE_ENV: process.env.NODE_ENV || 'development'
}




/*


 || 'mongodb://localhost/dance-class-test'
|| 'mongodb://localhost/dance-class'
|| 'HS256'
|| 'milldrew'


*/






