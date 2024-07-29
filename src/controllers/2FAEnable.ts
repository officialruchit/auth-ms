import { Request, Response } from 'express';
import authService from '../service/enableTwoFA';
const enableTwoFA = async (req: Request, res: Response) => {
  try {
   
   const id: string = (req as any).userId;
   const { method } = req.body;
   const response = await authService.enableTwoFA(id, method);
   res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

export default enableTwoFA;

