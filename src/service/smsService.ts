import dotenv from 'dotenv';
dotenv.config();

import { Twilio } from 'twilio';

class SmsService {
  private client: Twilio;
  constructor() {
    this.client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID as string,
      process.env.TWILIO_AUTH_TOKEN as string,
    );
  }
  public async sendOtp(phoneNumber: string, otp: string) {
    try {
      const message = await this.client.messages.create({
        body: `Your verification code is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  }
}

export default new SmsService();
