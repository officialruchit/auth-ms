import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class MailService {
  private transporter!: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "shane5@ethereal.email",
        pass: "hpPdMxpGZsUSny1euF",
      },
    });
  }
  async sendVerificationEmail(email: string) {
    const mailOptions = {
      from: "shane5@ethereal.email",
      to: email,
      subject: "Verify your email",
      text: "Hi \n\nCongratulations! You have successfully signed up.\n\nBest regards,\nYour Company",
    };

    await this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.messageId);
        console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
      }
    });
  }

  async sendVerificationEmailforVerifymailOrNumber(email: string) {
    const mailOptions = {
      from: "shane5@ethereal.email",
      to: email,
      subject: "Verify your email",
      text: "Hi \n\nCongratulations! You have successfully verify mail.\n\nBest regards,\nYour Company",
    };

    await this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent:" + info.messageId);
        console.log("Preview URL:" + nodemailer.getTestMessageUrl(info));
      }
    });
  }

  async passwordResetQueue(email: string, token: string) {
    const mailOptions = {
      from: "shane5@ethereal.email",
      to: email,
      subject: "forgot your password",
      text: `Hi \n\nclick here and reset your password use this \ntoken=${token}\n\nBest regards`,
    };

    await this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent:" + info.messageId);
        console.log("Preview URL:" + nodemailer.getTestMessageUrl(info));
      }
    });
  }

  async newpasswordQueue(email: string) {
    const mailOptions = {
      from: "shane5@ethereal.email",
      to: email,
      subject: "forgot your password",
      text: "Hi \n\nCongratulations! You have successfully reset the password mail.\n\nBest regards,\nYour Company",
    };

    await this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent:" + info.messageId);
        console.log("Preview URL:" + nodemailer.getTestMessageUrl(info));
      }
    });
  }
}
export default new MailService();
