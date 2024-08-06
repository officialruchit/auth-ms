import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/usersModel';
dotenv.config();
class AuthService {
  static async verifyOtp(data: {
    email?: string;
    phoneNumber?: string;
    otp: string;
  }) {
    const { email, phoneNumber, otp } = data;
    console.log(phoneNumber, otp, 'from service');
    const query = email
      ? { email, 'twoFA.otp': otp }
      : { phoneNumber, 'twoFA.otp': otp };
    console.log(query);
    const user = await User.findOne(query);
    console.log(user);
    if (!user) {
      throw new Error('user not found');
    }
    if (!user.twoFA || !user.twoFA.otpExpiry) {
      throw new Error('Invalid or expired OTP');
    }

    if (user.twoFA.otp !== otp) {
      throw new Error('invalid otp please enter the correct number');
    }

    return 'successfully verify';
  }
}

export default AuthService;
