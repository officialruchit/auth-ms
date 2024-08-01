import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import model from '../model/usersModel';
import crypto from 'crypto';
import twilio from 'twilio';
import mailService from './mailService';
const twilioClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

class authService {
  static async verifyTwoFA(id: string, token: string, otp: string) {
    const user = await model.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.isActive) {
      throw new Error('User is inactive');
    }
    console.log(user);
    if (user.twoFA.method === 'authenticator') {
      if (!user.twoFA.secret) {
        throw new Error('Secret is not set for authenticator 2FA');
      }
      const verified = speakeasy.totp.verify({
        secret: user.twoFA.secret,
        encoding: 'base32',
        token,
      });

      if (verified) {
        throw new Error('Invalid 2FA token');
      }
    } else if (user.twoFA.method === 'sms' || user.twoFA.method === 'email') {
      if (otp !== user.twoFA.otp || new Date() > user.twoFA.otpExpiry!) {
        throw new Error('Invalid or expired OTP');
      }
    }

    const jwtToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' },
    );
    return { token: jwtToken };
  }
}

export default authService;
