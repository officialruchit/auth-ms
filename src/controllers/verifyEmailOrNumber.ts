import { Request, Response } from 'express';
import authservice from '../service/verifyEmailOrNumber';

export const verifyEmailOrNumber = async (req: Request, res: Response) => {
  try {
    const id: string = (req as any).userId;
    const { email, phoneNumber,countryCode } = req.body;
    await authservice.verifyEmailOrNumber(id, email, phoneNumber,countryCode);
    res.status(200).json({ message: 'successful send otp check your device' });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};

export const otpForEmailOrNumber = async (req: Request, res: Response) => {
  try {
    const id: string = (req as any).userId;
    const { email, phoneNumber, otp } = req.body;
    await authservice.verifyOtp(id, otp, email, phoneNumber);
    res.status(200).json({ message: 'successfully verified' });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
