import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsController, AccountsService } from './controllers/account';

@Module({
  imports: [],
  controllers: [
    AppController,
    AccountsController
  ],
  providers: [
    AppService,
    AccountsService,
  ],
})
export class AppModule {}
