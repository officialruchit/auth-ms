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

  rabbitMQ.consume('verificationMailOrNumber', async (msg) => {
    if (msg) {
      const { email } = JSON.parse(msg.content.toString());
      await MailService.sendVerificationEmailforVerifymailOrNumber(email);
    }
  });

  rabbitMQ.consume('passwordResetQueue', async (msg) => {
    if (msg) {
      const { email, token } = JSON.parse(msg.content.toString());
      await MailService.passwordResetQueue(email, token);
    }
  });
  rabbitMQ.consume('newpasswordQueue', async (msg) => {
    if (msg) {
      const { email } = JSON.parse(msg.content.toString());
      await MailService.newpasswordQueue(email);
    }
  });
})();
