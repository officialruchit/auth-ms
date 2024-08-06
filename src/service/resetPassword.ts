import model from '../model/usersModel';
import mailService from './mailService';
import RabbitMQService from './rabbitmqService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {
  static resetPassword = async (token: string, newPassword: string) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId: string;
      };
      const user = await model.findById(decoded.userId);
      if (!user) {
        throw new Error('User not found');
      }
      if (!user.isActive) {
        throw new Error('User is inactive');
      }
      if (!token) {
        throw new Error('token is Required');
      }
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      await mailService.newpasswordQueue(user.email);
      const rabbitMQ = await RabbitMQService.getInstance();
      await rabbitMQ.publish('newPasswordQueue', { email: user.email });
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  };
}

export default AuthService;
