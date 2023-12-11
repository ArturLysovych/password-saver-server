import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordSchema } from './passwords.schema';
import { PasswordsController } from './passwords.controller';
import { PasswordsService } from './passwords.service';

@Module({
    imports: [
      MongooseModule.forRoot('mongodb+srv://arturlisovic:TKjCE6kpHlLMNL4k@cluster0.gws96pl.mongodb.net/?retryWrites=true&w=majority'),
      MongooseModule.forFeature([{ name: 'Password', schema: PasswordSchema }]),
    ],
    controllers: [PasswordsController],
    providers: [PasswordsService],
  })
export class PasswordsModule {}

