import { Request, Response } from 'express';
import authservice from '../service/viewProfileService';

const viewProfile = async (req: Request, res: Response) => {
  try {
    const id: string = (req as any).userId;
    const user = await authservice.viewProfile(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json('error');
  }
};

export default viewProfile;
