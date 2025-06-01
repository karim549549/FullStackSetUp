import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailFactory } from '../services/factories/email.factory';

@Global()
@Module({
  providers: [EmailService, EmailFactory],
  exports: [EmailService],
})
export class EmailModule {}
