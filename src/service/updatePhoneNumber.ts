import model from '../model/usersModel';
import { randomInt } from 'crypto';
import smsService from './smsService';
class authservice {
  static updatePhoneNumber = async (id: string, phoneNumber: string,countryCode:string) => {
    const user = await model.findById(id);
    if (!user) {
      throw new Error('user not found');
    }
    if (!user.isActive) {
      throw new Error('User is inactive');
    }
    const otp = randomInt(100000, 999999).toString();
    user.twoFA = {
      enabled: true,
      method: 'sms',
      otp,
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
    };
    const fullPhoneNumber=`${countryCode}${phoneNumber}`
    await smsService.sendOtp(fullPhoneNumber, otp);
    await user.save();
  };

  static verifyPhoneOtpAndUpdate = async (
    id: string,
    otp: string,
    phoneNumber: string,
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
    user.phoneNumber = phoneNumber;
    user.phoneVerified = true;
    user.twoFA = { enabled: false, method: 'sms' };
    await user.save();
    const userObject = user.toObject();
    delete userObject.twoFA.otp;
    delete userObject.twoFA.otpExpiry;

    return userObject;
  };
}
export default authservice;
