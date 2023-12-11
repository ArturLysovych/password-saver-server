import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PasswordsModule } from './passwords/passwords.module';

@Module({
  imports: [
    UsersModule,
    PasswordsModule,
  ],
})
export class AppModule {}
