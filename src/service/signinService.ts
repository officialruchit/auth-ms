import User from "../model/usersModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import RabbitMQService from "./rabbitmqService";
import dotenv from "dotenv";
dotenv.config();

class AuthService {
  static async signin(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      throw new Error("Invalid credentials");
    }

    //    const rabbitMQ = await RabbitMQService.getInstance();
    // await rabbitMQ.publish('verificationQueue', { email: user.email });

    return "succesufully login";
  }
}

export default AuthService;
