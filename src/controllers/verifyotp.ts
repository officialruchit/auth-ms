import { Request, Response } from 'express';
import AuthService from '../service/verifyotp';
const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber, otp } = req.body;
    console.log(otp, phoneNumber);
    const message = await AuthService.verifyOtp({ email, phoneNumber, otp });
    res.json({ message });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
export default verifyOtp;
