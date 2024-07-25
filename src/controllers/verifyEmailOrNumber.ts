import { Request, Response } from "express";
import authservice from "../service/verifyEmailOrNumber";

const verifyEmailOrNumber = async (req: Request, res: Response) => {
    try {
        const id: string = (req as any).userId;
        const { email, phoneNumber } = req.body;
        await authservice.verifyEmailOrNumber(id, email, phoneNumber)
        res.status(200).json({ message: 'Verification successful' });

    } catch (error) {
        res.status(400).json({ message: "error" });
    }
};

export default verifyEmailOrNumber;
