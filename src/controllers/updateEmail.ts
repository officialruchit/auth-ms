import { Request, Response } from 'express';
import authservice from '../service/updateEmail';
export const updateEmail = async (req: Request, res: Response) => {
  try {
    const id: string = (req as any).userId;
    const { email } = req.body;
    await authservice.updateEmail(id, email);
    res.status(200).json({message: 'OTP sent successfully'});
  } catch (error) {
    res.status(400).json(error);
  }
};

export const verifyEmail=async (req: Request, res: Response) =>{
try{
  const id: string = (req as any).userId
  const { otp, email } = req.body
  const user = await authservice.verifyEmailOtpAndUpdate(id, otp, email)
  res.status(200).send({ message: 'Phone number updated successfully',user  });
}catch(err){
  res.status(400).json(err);
}
}
