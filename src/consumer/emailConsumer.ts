import RabbitMQService from '../service/rabbitmqService';
import MailService from '../service/mailService';

(async () => {
    const rabbitMQ = await RabbitMQService.getInstance();

    rabbitMQ.consume('verificationQueue', async (msg) => {
        if (msg) {
            const { email } = JSON.parse(msg.content.toString());
            await MailService.sendVerificationEmail(email);
        }
    });
})();
