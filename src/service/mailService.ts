import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

class MailService {
  private transporter!: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.email',
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  async sendVerificationEmail(email: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      text: 'Hi \n\nCongratulations! You have successfully signed up.\n\nBest regards,\nYour Company',
    };

    await this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
    });
  }


  async sendVerificationEmailforVerifymailOrNumber(email: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      text: 'Hi \n\nCongratulations! You have successfully verify mail.\n\nBest regards,\nYour Company',
    };

    await this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent:' + info.messageId);
        console.log('Preview URL:' + nodemailer.getTestMessageUrl(info));
      }
    });
  }

  async passwordResetQueue(email: string, token: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'forgot your password',
      text: `Hi \n\nclick here and reset your password use this \ntoken=${token}\n\nBest regards`,
    };

    await this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent:' + info.messageId);
        console.log('Preview URL:' + nodemailer.getTestMessageUrl(info));
      }
    });
  }

  async newpasswordQueue(email: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'forgot your password',
      text: 'Hi \n\nCongratulations! You have successfully reset the password mail.\n\nBest regards,\nYour Company',
    };

    await this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent:' + info.messageId);
        console.log('Preview URL:' + nodemailer.getTestMessageUrl(info));
      }
    });
  }


  async sendEmailOtp(email: string,otp:string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      text: `Hi \n\nthis is your ${otp}. please verify and update for email\n\nBest regards,\nYour Company`,
    };

    await this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
    });
  }
}
export default new MailService();
