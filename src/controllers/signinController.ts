import { Request, Response } from 'express';
import AuthService from '../service/signinService';

const signin = async (req: Request, res: Response) => {
  try {
    
    const { email, password } = req.body;
    console.log(email, password, 'from controller');
    const message = await AuthService.signin( email, password);
    res.status(200).json({ message });
  } catch (err) {
    res.status(400).json(err);
  }
};

export default signin;
