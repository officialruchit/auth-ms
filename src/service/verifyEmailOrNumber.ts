import model from '../model/usersModel';
import RabbitMQService from './rabbitmqService';
class authservice {
  static verifyEmailOrNumber = async (
    id: string,
    email: string,
    phoneNumber: string,
  ) => {
    const user = await model.findById(id);
    if (!user) {
      throw new Error('user not found');
    }
    if (user.email !== email) {
      throw new Error('Email does not match');
    }
    console.log(email, phoneNumber);
    if (user.phoneNumber !== phoneNumber) {
      throw new Error('Email does not match');
    }

    user.emailVerified = true;
    user.phoneVerified = true;
    await user.save();

    const rabbitMQ = await RabbitMQService.getInstance();
    await rabbitMQ.publish('verificationMailOrNumber', { email: user.email });
  };
}
export default authservice;
