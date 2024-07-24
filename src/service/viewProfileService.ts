import model from "../model/usersModel";
import dotenv from "dotenv";
dotenv.config();

class authservice {
  static viewProfile = async (id: string) => {
    const user = await model.findById(id);
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  };
}
export default authservice;
