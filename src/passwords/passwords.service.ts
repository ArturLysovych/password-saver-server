import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Password } from './passwords.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PasswordsService {
    constructor(@InjectModel('Password') private readonly passwordModel: Model<Password>) {}

    getAll(): Promise<Password[]> {
        return this.passwordModel.find({ });
    }
    
    getPasswordByUserId(userId: string): Promise<Password[]> {
        return this.passwordModel.find({userId: userId});
    }

    async createPassword(password: Password) {
        const createdPassword = new this.passwordModel(password);
        return createdPassword.save();
    }

    async removePasswordById(passwordId: string) {
        return await this.passwordModel.deleteOne({ _id: passwordId });
    }
}
