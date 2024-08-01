import { Request, Response } from 'express';
import authservice from '../service/viewProfileService';

const viewProfile = async (req: Request, res: Response) => {
  try {
    const id: string = (req as any).userId;
    const user = await authservice.viewProfile(id);
    res.status(200).json(user);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};

export default viewProfile;
