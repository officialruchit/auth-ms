import model from "../model/usersModel";
import RabbitMQService from "./rabbitmqService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
class authservice {
  static resetPassword = async (token: string, newpassword: string) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    const user = await model.findById(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }
    user.password = await bcrypt.hash(newpassword, 10);
    await user.save();
    const rabbitMQ = await RabbitMQService.getInstance();
    await rabbitMQ.publish("newpasswordQueue", { email: user.email });
  };
}
export default authservice;
