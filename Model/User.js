
const db = require('../Config/db');

const createUserTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mobile_number VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error creating user table:', err);
      return;
    }
    console.log('User table created successfully.');
  });
};

const createUser = (mobile_number, password) => {
  const query = `INSERT INTO users (mobile_number, password) VALUES (?, ?)`;
  db.query(query, [mobile_number, password], (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      return;
    }
    console.log('User created successfully.');
  });
};

const findUserBymobile_number = (mobile_number, callback) => {
  const query = `SELECT * FROM users WHERE mobile_number = ?`;
  db.query(query, [mobile_number], (err, result) => {
    if (err) {
      console.error('Error finding user by mobile_number:', err);
      callback(err, null);
      return;
    }
    callback(null, result[0]);
  });
};

// user.js

module.exports = { createUserTable, createUser, findUserBymobile_number };
