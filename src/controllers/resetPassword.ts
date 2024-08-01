import { Request, Response } from 'express';
import authservice from '../service/resetPassword';
const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    await authservice.resetPassword(token, newPassword);
    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
export default resetPassword;
