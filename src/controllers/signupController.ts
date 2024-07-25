import { Request, Response } from "express";
import AuthService from "../service/authservice";

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
    } = req.body;
    const token = await AuthService.signUp({
      username,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      authMethod,
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export default signup;
