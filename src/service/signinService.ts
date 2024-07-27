import mdoel from '../model/usersModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import RabbitMQService from './rabbitmqService';
import dotenv from 'dotenv';
dotenv.config();

class AuthService {
  static async signin(id: string, email: string, password: string) {
    const user = await mdoel.findById(id);
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
    return 'succesufully login';
  }
}

export default AuthService;
