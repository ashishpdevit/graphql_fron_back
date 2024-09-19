const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '10.10.0.42',
  user: 'developer',
  password: 'D#v#l0p#r',
  database: 'graphql_demo2'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;