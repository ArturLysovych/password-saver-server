import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from './users.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://arturlisovic:TKjCE6kpHlLMNL4k@cluster0.gws96pl.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
