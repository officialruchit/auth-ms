import model from "../model/usersModel";
import RabbitMQService from "./rabbitmqService";
import jwt from "jsonwebtoken";
class authservice {
  static forgotPassword = async (id: string, email: string) => {
    const user = await model.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    const rabbitMQ = await RabbitMQService.getInstance();
    await rabbitMQ.publish("passwordResetQueue", { email: user.email, token });
  };
}
export default authservice;
