// const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');

// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },

// });


// const User = mongoose.model("User", UserSchema);
// module.exports = User;

const db = require('../Config/db');

const createUserTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
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

const createUser = (username, password) => {
  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      return;
    }
    console.log('User created successfully.');
  });
};

const findUserByUsername = (username, callback) => {
  const query = `SELECT * FROM users WHERE username = ?`;
  db.query(query, [username], (err, result) => {
    if (err) {
      console.error('Error finding user by username:', err);
      callback(err, null);
      return;
    }
    callback(null, result[0]);
  });
};


module.exports = { createUserTable, createUser, findUserByUsername };
