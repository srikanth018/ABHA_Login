const AuthService = require('../Service/Auth_service');
const errors= require('../errors');

const authService = new AuthService();

exports.register = async (req, res, next) => {
  const { mobile_number, password } = req.body;
  const result = await authService.register(mobile_number, password);
  res.status(result.status).json({ message: result.message, error: result.error });
};

exports.login = async (req, res, next) => {
  const { mobile_number, password } = req.body;
  const result = await authService.login(mobile_number, password);
  res.status(result.status).json({ message: result.message, user: result.user, error: result.error });
};

// exports.aadhar_verify = async (req, res) =>{
//   const {aadhar_number} = req.body;

// }

exports.aadhar_verify = async (req, res) => {
  const { aadhar_number } = req.body;

  try {
    // Step 1: Generate Aadhaar OTP
    const otpResponse = await authService.generateAadhaarOTP(aadhar_number);
    const { txnId } = otpResponse;

    // Assume the OTP is received and entered by the user manually
    const enteredOtp = '123456'; // Replace with actual user input

    // Step 2: Verify Aadhaar OTP
    const otpVerificationResponse = await authService.verifyAadhaarOTP(enteredOtp, txnId);

    // Check if OTP verification was successful
    if (otpVerificationResponse.success) {
      // Handle successful verification
      res.status(200).json({ message: 'Aadhaar verification successful' });
    } else {
      // Handle unsuccessful verification
      res.status(400).json({ message: 'Aadhaar verification failed', error: otpVerificationResponse.error });
    }
  } catch (error) {
    errors.handleServerError(res, error);
  }
};