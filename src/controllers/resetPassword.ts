import { Request, Response } from "express";
import authservice from "../service/resetPassword";
const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;
        await authservice.resetPassword(token, newPassword);
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(400).json({ error });
    }
};
export default resetPassword;