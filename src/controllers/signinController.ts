import { Request, Response } from 'express';
import AuthService from '../service/signinService';

const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const message = await AuthService.signin(email, password);
    res.status(200).json({ message });
  } catch (err) {
    const error = err as Error
    res.status(400).json({ message: error.message });
  }
};

export default signin;
