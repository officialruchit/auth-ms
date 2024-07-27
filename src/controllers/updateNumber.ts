import { Request, Response } from 'express';
import authservice from '../service/updatePhoneNumber';
const updatePhoneNumber = async (req: Request, res: Response) => {
    try {
        const { phoneNumber } = req.body;
        const id: string = (req as any).userId;
        await authservice.updatePhoneNumber(id, phoneNumber);
        res.status(200).json('successfully send otp please check your mobile');
    } catch (err) {
        res.status(400).json(err);
    }
};
export default updatePhoneNumber;
