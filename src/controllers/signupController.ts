import { Request, Response } from 'express';
import AuthService from '../service/authservice';

const signup = async (req: Request, res: Response) => {
  try {
    const {
      username,
      email,
      phoneNumber,
      password,
      firstName,
      lastName,
      authMethod,
      roles,
      address: { line1, line2, city, state, country, zipCode },
    } = req.body;
    await AuthService.signUp({
      username,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      authMethod,
      roles,
      address: {
        line1,
        line2,
        city,
        state,
        country,
        zipCode,
      },
    });
    res.json({ "message": "seccessfully signup" });
  } catch (err) {
    const error = err as Error
    res.status(400).json({ message: error.message });
  }
};

export default signup;
