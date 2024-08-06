import model from '../model/usersModel';
import { randomInt } from 'crypto';
import mailService from './mailService';
class authservice {
  static updateEmail = async (id: string, email: string) => {
    const user = await model.findById(id);
    if (!email) {
      throw new Error('email is required');
    }
    if (!user) {
      throw new Error('user not found');
    }
    if (!user.isActive) {
      throw new Error('User is inactive');
    }
    const otp = randomInt(100000, 999999).toString();
    user.twoFA = {
      enabled: true,
      method: 'email',
      otp,
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
    };
    await mailService.sendEmailOtp(email, otp);

    await user.save();
  };

  static verifyEmailOtpAndUpdate = async (
    id: string,
    otp: string,
    email: string,
  ) => {
    const user = await model.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.twoFA.otp || !user.twoFA.otpExpiry) {
      throw new Error('OTP not found. Please request a new one.');
    }

    if (user.twoFA.otpExpiry < new Date()) {
      throw new Error('OTP has expired. Please request a new one.');
    }

    if (user.twoFA.otp !== otp) {
      throw new Error('Invalid OTP. Please enter the correct OTP.');
    }

    // Update email and reset twoFA
    user.email = email;
    user.emailVerified = true;
    user.twoFA = { enabled: false, method: 'email' };
    await user.save();

    // Remove sensitive fields before returning
    const userObject = user.toObject();
    delete userObject.twoFA.otp;
    delete userObject.twoFA.otpExpiry;

    return userObject;
  };
}
export default authservice;
