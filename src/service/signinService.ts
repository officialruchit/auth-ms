import mdoel from '../model/usersModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import RabbitMQService from './rabbitmqService';
import dotenv from 'dotenv';
dotenv.config();

class AuthService {
  static async signin(email: string, password: string) {
    //if (!email || password) {
    //   throw new Error('please enter the email or password');
    //}
    const user = await mdoel.findOne({ email });
    if (!user) {
      throw new Error('user not found');
    }
    if (user.email !== email) {
      throw new Error('invalid email');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign(
      { userId: user.id, roles: user.roles },
      process.env.JWT_SECRET as string,
      { expiresIn: '23h' },
    );
    return { token };
  }
}
export default AuthService;
