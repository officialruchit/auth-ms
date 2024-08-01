import { Request, Response } from 'express';
import authService from '../service/verifyTwoFA';
const verifyTwoFA = async (req: Request, res: Response) => {
  try {
    const { id, token, otp } = req.body;
    const response = await authService.verifyTwoFA(id, token, otp);
    res.status(200).json(response);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
export default verifyTwoFA;
