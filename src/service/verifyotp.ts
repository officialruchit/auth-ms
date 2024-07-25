import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/usersModel";

dotenv.config();

class AuthService {
    static async verifyOtp(data: { email?: string, phoneNumber?: string, otp: string }) {
        const { email, phoneNumber, otp } = data;
        const query = email ? { email, 'twoFA.otp': otp } : { phoneNumber, 'twoFA.otp': otp };

        const user = await User.findOne(query);

        if (!user || !user.twoFA || !user.twoFA.otpExpiry || user.twoFA.otpExpiry < new Date()) {
            throw new Error('Invalid or expired OTP');
        }

        if (phoneNumber) user.phoneVerified = true;
        if (email) user.emailVerified = true;

        user.twoFA = { enabled: false, method: 'sms' };
        await user.save();

        return jwt.sign(
            { userId: user.id, role: user.roles },
            process.env.JWT_SECRET as string,
            {
              expiresIn: "23h",
            }
          );
    }
}

export default AuthService;
