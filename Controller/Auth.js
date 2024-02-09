// const User = require("../Model/User");
// const bcrypt = require('bcrypt');

// exports.register = async (req, res, next) => {
//   const {us_name} = req.body 
//    const check_user = await User.findOne({us_name});
//    if(!check_user) {
//     const { username, password } = req.body;
//     if (password.length < 6) {
//         return res.status(400).json({ message: "Password less than 6 characters" });
//     }
//     try {
//         const user = await User.create({ username, password });
//         res.status(200).json({
//             message: "User successfully created",
//             user,
//         });
//     } catch (err) {
//         res.status(401).json({
//             message: "User not successfully created",
//             error: err.message, 
//         });
//     }
//    }
//    else{
//       res.status(401).json({
//         message: "User already exists",
//     });
//    }

// };



// exports.login = async (req, res, next) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username }); 
//     if (!user) {
//       res.status(401).json({
//         message: "Login not successful",
//         error: "User not found",
//       });
//       return; 
//     }

    
//     // const passwordMatch = await bcrypt.compare(password, user.password);
//     const passwordMatch = await password===user.password;

//     console.log( passwordMatch)
//     if (!passwordMatch) {
//       res.status(401).json({
//         message: "Login not successful",
//         error: "Incorrect password",
//       });
//       return;
//     }

//     res.status(200).json({
//       message: "Login successful",
//       user,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: "An error occurred",
//       error: error.message,
//     });
//   }
// };

// const bcrypt = require('bcrypt');
// const { createUser, findUserByUsername } = require('../Model/User');

const bcrypt = require('bcrypt');
const { createUser, findUserByUsername } = require('../Model/User');

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" });
    }

    // Check if the user exists
    findUserByUsername(username, async (err, user) => {
      if (err) {
        console.error('Error finding user by username:', err);
        return res.status(500).json({ message: "Error registering user", error: err });
      }

      if (user) {
        return res.status(401).json({ message: "User already exists" });
      }

      // If user doesn't exist, hash the password and create the user
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        createUser(username, hashedPassword);

        res.status(200).json({ message: "User successfully created" });
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: "Error registering user", error });
      }
    });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: "Error registering user", error: err });
  }
};



exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  findUserByUsername(username, async (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error logging in", error: err });
    }

    if (!user) {
      return res.status(401).json({ message: "Login not successful", error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Login not successful", error: "Incorrect password" });
    }

    res.status(200).json({ message: "Login successful", user });
  });
};
