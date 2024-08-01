import model from '../model/usersModel';
import mailService from './mailService';
import RabbitMQService from './rabbitmqService';
import { randomInt } from 'crypto';
import smsService from './smsService';
class authservice {
  static verifyEmailOrNumber = async (
    id: string,
    email: string,
    phoneNumber: string,
  ) => {
    const user = await model.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.isActive) {
      throw new Error('User is inactive');
    }
    if (email && user.email !== email) {
      throw new Error('Email does not match');
    }
    if (phoneNumber && user.phoneNumber !== phoneNumber) {
      throw new Error('Phone number does not match');
    }
    const otp = randomInt(100000, 999999).toString();

    if (email) {
      await mailService.sendEmailOtp(email, otp);
      console.log(`OTP sent to email: ${email}`);
    }
    if (phoneNumber) {
      await smsService.sendOtp(phoneNumber, otp);
    }
    user.twoFA.otp = otp;
    await user.save();
  };
  static verifyOtp = async (
    id: string,
    otp: string,
    email?: string,
    phoneNumber?: string,
  ) => {
    console.log(otp, email)
    const user = await model.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    console.log(user)
    if (user.twoFA.otp !== otp) {
      throw new Error('Email OTP does not match');
    }
    if (email) {
      user.emailVerified = true;
    }
    if (phoneNumber) {
      user.phoneVerified = true;
    }
    await user.save();
  };
}

export default authservice;
