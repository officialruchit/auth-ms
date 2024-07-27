import { Request, Response } from 'express';
import AuthService from '../service/signinService';

const signin = async (req: Request, res: Response) => {
  try {
    const id: string = (req as any).userId;
    const { email, password } = req.body;
    console.log(email, password, 'from controller');
    const message = await AuthService.signin(id, email, password);
    res.status(200).json({ message });
  } catch (err) {
    res.status(400).json(err);
  }
};

export default signin;
