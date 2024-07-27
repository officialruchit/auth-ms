import model from '../model/usersModel';
import jwt from 'jsonwebtoken';
import mailService from './mailService';

class AuthService {
  static forgotPassword = async (email: string) => {
    const user = await model.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '10m' },
    );
    console.log(token);
    console.log(user.id);
    await mailService.passwordResetQueue(email, token);
  };
}

export default AuthService;
