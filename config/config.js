require('dotenv').config(); // this is important!
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "",
    "database": "testdb",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "username": "kidsthesedays",
    "password": "password",
    "database": "kidsthesedays",
    "host": "199.36.111.25",
    "dialect": "mysql"
  }
}
