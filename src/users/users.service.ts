import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    getAll(): Promise<User[]> {
        return this.userModel.find({})
    }

    async regUser(user: User) {
        const findedUser = await this.userModel.findOne({ login: user.login });
  
        if (findedUser) {
          console.log(`This login is already in use`);
          return null;
        } else {
          const createdUser = new this.userModel(user);
          return createdUser.save();
        }
    }

    async removeUserById(userId: string) {
      return await this.userModel.deleteOne({ _id: userId });
    }

    async removeUserByLogin(userLogin: string) {
      return await this.userModel.deleteOne({ login: userLogin });
    }

    async logUser(user: User): Promise<Boolean | String> {
      const findedUser = await this.userModel.findOne({ login: user.login });

      if(findedUser) {
        if(user.login === findedUser.login && user.password === findedUser.password) return true;
        else return false;
      }else {
        return 'User not found'; 
      }
    }
}    
