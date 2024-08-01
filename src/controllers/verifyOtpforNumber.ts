import { Request, Response } from 'express';
import authservice from '../service/updatePhoneNumber';
const verifyotp = async (req: Request, res: Response) => {
    try {
        const id: string = (req as any).userId
        const { otp, phoneNumber } = req.body
        const user = await authservice.verifyPhoneOtpAndUpdate(id, otp, phoneNumber)
        res.status(200).send({ message: 'Phone number updated successfully', user });
    } catch (err) {
        const error = err as Error
        res.status(400).json({ message: error.message });
    }
};

export default verifyotp;