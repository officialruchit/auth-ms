import { Request, Response } from "express";
import authservice from "../service/forgotPassword";
const forgotPassword = async (req: Request, res: Response) => {
    try {
        const id: string = (req as any).userId;
        const { email } = req.body;
        await authservice.forgotPassword(id, email);
        res.status(200).json({ message: "Password reset link sent" });
    } catch (error) {
        res.status(400).json({ error });
    }
};
export default forgotPassword;