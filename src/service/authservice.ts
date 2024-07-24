import User from "../model/usersModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import RabbitMQService from "./rabbitmqService";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();
//import smsService from './smsService'
class AuthService {
    static async signUp(data:{phoneNumber?:string,email?: string,username:string, password: string, firstName: string, lastName: string,authMethod:'sms'|'email'}) {
        const {username, email, phoneNumber, password, firstName, lastName, authMethod } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = crypto.randomInt(100000, 999999).toString();
        if(!email&& !phoneNumber){
            throw new Error('Either email or phone number must be provided.');
        }
        const user = new User({
            username,
            email,
            password: hashedPassword,
            profile: { firstName, lastName },
            twoFA: { enabled: true, method: authMethod, otp, otpExpiry: new Date(Date.now() + 10 * 60000) }
        });
        await user.save();
/*if(authMethod==='sms' && phoneNumber){
    await smsService.sendOtp(phoneNumber, otp);
}*/
        const rabbitMQ = await RabbitMQService.getInstance();
        await rabbitMQ.publish('verificationQueue', { email: user.email });

        const token = jwt.sign({ userId: user.id,role:user.roles }, process.env.JWT_SECRET as string, {
            expiresIn: "23h",
        });
        return token;
    }
}

export default AuthService;
