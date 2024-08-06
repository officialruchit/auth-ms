import User from '../model/usersModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import RabbitMQService from './rabbitmqService';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();
import smsService from './smsService';
class AuthService {
  static async signUp(data: {
    phoneNumber?: string;
    countryCode?: string;
    email?: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    authMethod: 'sms' | 'email';
    roles?: string;
    address: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      country?: string;
      zipCode?: string;
    };
  }) {
    const {
      username,
      email,
      phoneNumber,
      countryCode,
      password,
      firstName,
      lastName,
      authMethod,
      roles,
      address,
    } = data;

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }
    if (phoneNumber && phoneNumber.length < 10) {
      throw new Error('Phone number must be at least 10 digits long.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = crypto.randomInt(100000, 999999).toString();
    if (!email && !phoneNumber) {
      throw new Error('Either email or phone number must be provided.');
    }
    const user = new User({
      username,
      phoneNumber,
      countryCode,
      email,
      password: hashedPassword,
      profile: {
        firstName,
        lastName,
        address,
      },
      twoFA: {
        enabled: true,
        method: authMethod,
        otp,
        otpExpiry: new Date(Date.now() + 10 * 60000),
      },
      isActive: true,
      roles,
    });
    await user.save();

    if (authMethod === 'sms' && phoneNumber && countryCode) {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      await smsService.sendOtp(fullPhoneNumber, otp);
    }
    const rabbitMQ = await RabbitMQService.getInstance();
    await rabbitMQ.publish('verificationQueue', { email: user.email });
  }
}

export default AuthService;
