import model from '../model/usersModel';
import crypto from 'crypto';
class authservice {
  static changeTwofa = async (id: string, method: string) => {
    const user = await model.findById(id);
    if (!user) {
      throw new Error('user not found');
    }
    const otp = crypto.randomInt(100000, 999999).toString();
  };
}
export default authservice;