const bcrypt = require('bcrypt');
const { createUser, findUserByUsername } = require('../../Model/User');

class AuthService {
  async register(username, password) {
    try {
      if (password.length < 6) {
        return { status: 400, message: "Password less than 6 characters" };
      }

      const user = await this.findUser(username);
      if (user) {
        return { status: 401, message: "User already exists" };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await createUser(username, hashedPassword);

      return { status: 200, message: "User successfully created" };
    } catch (error) {
      console.error('Error creating user:', error);
      return { status: 500, message: "Error registering user", error };
    }
  }

  async login(username, password) {
    try {
      const user = await this.findUser(username);
      if (!user) {
        return { status: 401, message: "Login not successful", error: "User not found" };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { status: 401, message: "Login not successful", error: "Incorrect password" };
      }

      return { status: 200, message: "Login successful", user };
    } catch (error) {
      console.error('Error logging in:', error);
      return { status: 500, message: "Error logging in", error };
    }
  }

  async findUser(username) {
    return new Promise((resolve, reject) => {
      findUserByUsername(username, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  }
}

module.exports = AuthService;
