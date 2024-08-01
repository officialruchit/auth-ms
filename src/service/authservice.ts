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
    phoneNumber?: string; email?: string; username: string; password: string; firstName: string; lastName: string;
    authMethod: 'sms' | 'email'; roles?: string, address: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      country?: string;
      zipCode?: string;
    };
  }) {
    const { username, email, phoneNumber, password, firstName, lastName, authMethod, roles, address } = data;

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = crypto.randomInt(100000, 999999).toString();
    if (!email && !phoneNumber) {
      throw new Error('Either email or phone number must be provided.');
    }
    const user = new User({
      username,
      phoneNumber,
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
      roles
    });
    await user.save();
    console.log(roles)
    if (authMethod === 'sms' && phoneNumber) {
      await smsService.sendOtp(phoneNumber, otp);
    }
    const rabbitMQ = await RabbitMQService.getInstance();
    await rabbitMQ.publish('verificationQueue', { email: user.email });

  }
}

export default AuthService;
