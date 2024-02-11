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
  async generateAadhaarOTP(aadharNumber){
  const apiBaseUrl = 'https://healthidsbx.abdm.gov.in';
    
    try {
      const url = `${apiBaseUrl}/v1/registration/aadhaar/generateOtp`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ aadharNumber })
      });

      if (!response.ok) {
        throw new Error(`Failed to generate Aadhaar OTP: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating Aadhaar OTP:', error);
      throw error;
    }
  }


  async verifyAadhaarOTP(otp, txnId) {
    try {
      const url = `${this.apiBaseUrl}/v1/registration/aadhaar/verifyOTP`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ otp, txnId })
      });

      if (!response.ok) {
        throw new Error(`Failed to verify Aadhaar OTP: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error verifying Aadhaar OTP:', error);
      throw error;
    }
  }

}



module.exports = AuthService;
