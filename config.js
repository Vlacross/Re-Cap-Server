require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/dance-class',
  TEST_MONGODB_URI: process.env.TEST_MONGODB_URI || 'mongodb://localhost/dance-class-test',
  ALGORITHM: process.env.ALGORITHM || 'sha256',
  JWT_SECRET: process.env.JWT_SECRET || 'milldrew',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  NODE_ENV: process.env.NODE_ENV || 'development'
}











