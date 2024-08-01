import model from '../model/usersModel';
import dotenv from 'dotenv';
dotenv.config();

class authservice {
  static viewProfile = async (id: string) => {
    const user = await model.findById(id).select('-password');
    if (!user) {
      throw new Error('user not found');
    }
    if (!user.isActive) {
      throw new Error('User is inactive');
    }
    const userObject = user.toObject();
    delete userObject.twoFA.otp;
    delete userObject.twoFA.otpExpiry;

    return userObject;
  };
}
export default authservice;
