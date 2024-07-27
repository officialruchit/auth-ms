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

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      await mailService.newpasswordQueue(user.email);

      const rabbitMQ = await RabbitMQService.getInstance();
      await rabbitMQ.publish('newPasswordQueue', { email: user.email });

      console.log('Password reset successful');
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  };
}

export default AuthService;
