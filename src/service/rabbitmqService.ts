import amqp from 'amqplib';
import dotenv from "dotenv"
dotenv.config()
class RabbitMQService {
    private static instance: RabbitMQService;
    private connection!: amqp.Connection;
    private channel!: amqp.Channel;

    private constructor() {}

    public static async getInstance() {
        if (!RabbitMQService.instance) {
            RabbitMQService.instance = new RabbitMQService();
            await RabbitMQService.instance.connect();
        }
        return RabbitMQService.instance;
    }

    private async connect() {
        this.connection = await amqp.connect(process.env.RABBITMQ_URL as string);
        this.channel = await this.connection.createChannel();
    }

    public async publish(queue: string, message: any) {
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
    }

    public async consume(queue: string, callback: (msg: amqp.ConsumeMessage | null) => void) {
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.consume(queue, callback, { noAck: true });
    }
}

export default RabbitMQService;
