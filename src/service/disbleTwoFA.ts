import UserModel from '../model/usersModel';
class AuthService {
  static async disableTwoFA(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.twoFA = { enabled: false, method: 'email' };
    await user.save();
    return { message: '2FA disabled' };
  }
}
export default AuthService;
