import { Request, Response } from 'express';
import AuthService from '../service/disbleTwoFA';
const disableTwoFA = async (req: Request, res: Response) => {
  try {
    const id: string = (req as any).userId;
    const response = await AuthService.disableTwoFA(id);
    res.status(200).json(response);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};
export default disableTwoFA;
