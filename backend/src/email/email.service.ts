import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { EMAILNAME } from 'src/utils/types/email.types';
import { EmailFactory } from 'src/services/factories/email.factory';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { DEFAULT_EXPIRATION_MS } from 'src/utils/constants/passswordRegex';
@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private configService: ConfigService,
    private readonly emailFactory: EmailFactory,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendWelcomeEmail(username: string, email: string): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'Welcome to our platform',
      template: EMAILNAME.WELCOME_EMAIL,
      context: { username, email },
    });
  }

  async sendVerificationEmail(email: string): Promise<boolean> {
    const verificationCode = this.generate6DigitCode();
    const verificationCodeExpiration =
      this.configService.get<number>('VERIFICATION_CODE_EXPIRATION') ||
      DEFAULT_EXPIRATION_MS; // 15 minutes in seconds

    await this.cacheManager.set(
      `verify: ${email}`,
      verificationCode,
      verificationCodeExpiration,
    );
    return this.sendEmail({
      to: email,
      subject: 'Verify your email',
      template: EMAILNAME.VERIFY_EMAIL,
      context: { email, verificationCode },
    });
  }

  async sendForgetPasswordEmail(email: string): Promise<boolean> {
    const verificationCode = this.generate6DigitCode();
    let verificationCodeExpiration = this.configService.get<number>(
      'FORGET_PASSWORD_CODE_EXPIRATION',
    );
    if (!verificationCodeExpiration) {
      // no we gonna log that this happens  only   and we gonna use  default  value which is 15 min
      console.log('FORGET_PASSWORD_CODE_EXPIRATION is not set in .env file');
      verificationCodeExpiration = DEFAULT_EXPIRATION_MS; // 15 minutes in seconds
    }

    await this.cacheManager.set(
      `verify: ${email}`,
      verificationCode,
      verificationCodeExpiration,
    );
    return this.sendEmail({
      to: email,
      subject: 'Reset your password',
      template: EMAILNAME.FORGOT_PASSWORD_EMAIL,
      context: { email, verificationCode },
    });
  }

  private async sendEmail({
    to,
    subject,
    template,
    context,
  }: {
    to: string;
    subject: string;
    template: EMAILNAME;
    context: Record<string, any>;
  }): Promise<boolean> {
    const html = this.emailFactory.createEmail(template, context);
    const mailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to,
      subject,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }

  private generate6DigitCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
