const bcrypt = require('bcrypt');
const { createUser, findUserBymobile_number } = require('../Model/User');

class AuthService {
  async register(mobile_number, password) {
    try {
      if (password.length < 6) {
        return { status: 400, message: "Password less than 6 characters" };
      }

      const user = await this.findUser(mobile_number);
      if (user) {
        return { status: 401, message: "User already exists" };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await createUser(mobile_number, hashedPassword);

      return { status: 200, message: "User successfully created" };
    } catch (error) {
      console.error('Error creating user:', error);
      return { status: 500, message: "Error registering user", error };
    }
  }

  async login(mobile_number, password) {
    try {
      const user = await this.findUser(mobile_number);
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

  async findUser(mobile_number) {
    return new Promise((resolve, reject) => {
      findUserBymobile_number(mobile_number, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  }
  constructor() {
    this.apiBaseUrl = 'https://healthidsbx.abdm.gov.in';
  }

  async generateAadhaarOTP(aadharNumber) {
    try {
      const url = `${this.apiBaseUrl}/v1/registration/aadhaar/generateOtp`;
      const response = await axios.post(url, { aadharNumber }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error generating Aadhaar OTP:', error.message);
      throw error;
    }
  }

  async verifyAadhaarOTP(otp, txnId) {
    try {
      const url = `${this.apiBaseUrl}/v1/registration/aadhaar/verifyOTP`;
      const response = await axios.post(url, { otp, txnId }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error verifying Aadhaar OTP:', error.message);
      throw error;
    }
  }
}






module.exports = AuthService;
