import { Request, Response } from 'express';
import AuthService from '../service/signinService';

const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const message = await AuthService.signin(email, password);
    res.json({ message });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export default signin;
