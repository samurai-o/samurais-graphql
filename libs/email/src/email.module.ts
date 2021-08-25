import { ConfigurationModule } from '@app/configuration';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  imports: [ConfigurationModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
