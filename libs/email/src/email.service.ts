import { ConfigurationService, IEnv } from '@app/configuration';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EmailMessage } from './interface';

@Injectable()
export class EmailService implements OnModuleInit {
  private email: Transporter<SMTPTransport.SentMessageInfo>;
  constructor(private readonly config: ConfigurationService) { }
  onModuleInit() {
    const { email, password, email_url } = this.config.getEnvironment() as IEnv;
    this.email = createTransport(
      smtpTransport({
        host: email_url,
        secure: false,
        port: 25,
        auth: { user: email, pass: password },
      }),
    );
  }

  sendMessage(params: EmailMessage) {
    const { to, ..._params } = params;
    const from = this.config.getEnvironment('ADMIN_EMAIL') as string;
    console.log(this.config.getEnvironment('ADMIN_PASSWORD'));
    return new Promise((res) => {
      this.email.sendMail(
        { ..._params, from, to: to.join(',') },
        (err, info) => {
          if (err) res(false);
          else res(info);
          this.email.close();
        },
      );
    });
  }
}
