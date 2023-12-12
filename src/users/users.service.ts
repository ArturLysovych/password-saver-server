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
          return 'This login is already in use';
        } else {
          const createdUser = new this.userModel(user);
          createdUser.save();
          return 'User was created';
        }
    }

    async removeUserById(userId: string) {
      return await this.userModel.deleteOne({ _id: userId });
    }

    async removeUserByLogin(userLogin: string) {
      return await this.userModel.deleteOne({ login: userLogin });
    }

    async logUser(user: User): Promise<Boolean | String | User> {
      const findedUser = await this.userModel.findOne({ login: user.login });

      if(findedUser) {
        if(user.login === findedUser.login && user.password === findedUser.password) return findedUser;
        else return false;
      }else {
        return 'User not found'; 
      }
    }

    async changePassword(userId: string, lastPassword: string, newPassword: string): Promise<any> {
      try {
        const user = await this.userModel.findOne({ _id: userId });

        if (!user) return { success: false, message: 'User not found.' };
    
        if (user.password !== lastPassword) return { success: false, message: 'Invalid password.' };
        user.password = newPassword;
        await user.save();
    
        return { success: true, message: 'Password updated successfully.' };
      } catch (error) {
        return { success: false, message: 'An error occurred while updating the password.' };
      }
    }
    
}    
