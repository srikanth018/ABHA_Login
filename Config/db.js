
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/fest-realm');
 
// var db = mongoose.connection;
// const connectDB = ()=>{
//   db.on('error', console.error.bind(console, 'connection error:'));
 
//   db.once('open', function() {
//     console.log("Connection Successful!");
//   });
// }

// module.exports = connectDB;

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'patient_details'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = db;


