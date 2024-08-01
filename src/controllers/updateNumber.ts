import { Request, Response } from 'express';
import authservice from '../service/updatePhoneNumber';
const updatePhoneNumber = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, countryCode } = req.body;
    const id: string = (req as any).userId;
    await authservice.updatePhoneNumber(id, phoneNumber, countryCode);
    res.status(200).json('successfully send otp please check your mobile');
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
export default updatePhoneNumber;
