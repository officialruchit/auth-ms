import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import model from '../model/usersModel';
import crypto from 'crypto';
import twilio from 'twilio';
import mailService from './mailService';
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

class authService {
    static async enableTwoFA(userId: string, method: 'sms' | 'email' | 'authenticator') {
        const user = await model.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.isActive) {
            throw new Error('User is inactive');
        }

        if (method === 'authenticator') {
            const secret = speakeasy.generateSecret({ length: 20 });
            user.twoFA = { enabled: true, method, secret: secret.base32 };
            await user.save();
            const otpAuthUrl = speakeasy.otpauthURL({
                secret: secret.base32,
                label: user.email,
                encoding: 'base32'
            });
            const qrCode = await QRCode.toDataURL(otpAuthUrl);
            return { qrCode };
        } else {
            const otp = crypto.randomInt(100000, 999999).toString();
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
            user.twoFA = { enabled: true, method, otp, otpExpiry };
            await user.save();

            if (method === 'sms') {
                await twilioClient.messages.create({
                    body: `Your verification code is ${otp}`,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: user.phoneNumber!
                });
            } else if (method === 'email') {
                mailService.enableTwoFA(user.email, otp)
            }
        }

        return { message: '2FA enabled' };
    }
}

export default authService;
