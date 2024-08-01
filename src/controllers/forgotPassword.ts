import { Request, Response } from 'express';
import authservice from '../service/forgotPassword';
const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await authservice.forgotPassword(email);
    res.status(200).json({ message: 'Password reset link sent' });
  } catch (err) {
    const error = err as Error
    res.status(400).json({ message: error.message });
  }
};
export default forgotPassword;
